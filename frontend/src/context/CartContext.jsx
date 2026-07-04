import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [carrinho, setCarrinho] = useState(() => {

        const carrinhoSalvo = localStorage.getItem("carrinho");

        return carrinhoSalvo
            ? JSON.parse(carrinhoSalvo)
            : [];

    });

    useEffect(() => {

        localStorage.setItem(

            "carrinho",

            JSON.stringify(carrinho)

        );

    }, [carrinho]);

    function adicionarProduto(produto, quantidade) {

        setCarrinho((itens) => {

            const existente = itens.find(

                item => item.id_produto === produto.id_produto

            );

            if (existente) {

                return itens.map(item =>

                    item.id_produto === produto.id_produto

                        ? {

                            ...item,

                            quantidade: item.quantidade + quantidade,

                            selecionado: true

                        }

                        : item

                );

            }

            return [

                ...itens,

                {

                    ...produto,

                    quantidade,

                    selecionado: true

                }

            ];

        });

    }

    function removerProduto(id) {

        setCarrinho(

            itens =>

                itens.filter(

                    item => item.id_produto !== id

                )

        );

    }

    function removerSelecionados() {

        setCarrinho(

            itens =>

                itens.filter(

                    item => !item.selecionado

                )

        );

    }

    function aumentarQuantidade(id) {

        setCarrinho(

            itens =>

                itens.map(item =>

                    item.id_produto === id

                        ? {

                            ...item,

                            quantidade: item.quantidade + 1

                        }

                        : item

                )

        );

    }

    function diminuirQuantidade(id) {

        setCarrinho(

            itens =>

                itens

                    .map(item =>

                        item.id_produto === id

                            ? {

                                ...item,

                                quantidade: item.quantidade - 1

                            }

                            : item

                    )

                    .filter(

                        item => item.quantidade > 0

                    )

        );

    }

    function selecionarProduto(id) {

        setCarrinho(

            itens =>

                itens.map(item =>

                    item.id_produto === id

                        ? {

                            ...item,

                            selecionado: !item.selecionado

                        }

                        : item

                )

        );

    }

    function selecionarTodos() {

        const todosSelecionados = carrinho.every(

            item => item.selecionado

        );

        setCarrinho(

            carrinho.map(item => ({

                ...item,

                selecionado: !todosSelecionados

            }))

        );

    }

    return (

        <CartContext.Provider

            value={{

                carrinho,

                adicionarProduto,

                removerProduto,

                removerSelecionados,

                aumentarQuantidade,

                diminuirQuantidade,

                selecionarProduto,

                selecionarTodos

            }}

        >

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {

    return useContext(CartContext);

}