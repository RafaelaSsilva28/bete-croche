import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [carrinho, setCarrinho] = useState([]);

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
                            quantidade: item.quantidade + quantidade
                        }

                        : item

                );

            }

            return [

                ...itens,

                {

                    ...produto,

                    quantidade

                }

            ];

        });

    }

    function removerProduto(id) {

        setCarrinho(itens =>
            itens.filter(item => item.id_produto !== id)
        );

    }

    function aumentarQuantidade(id) {

        setCarrinho(itens =>

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

        setCarrinho(itens =>

            itens
                .map(item =>

                    item.id_produto === id

                        ? {

                            ...item,

                            quantidade: item.quantidade - 1

                        }

                        : item

                )
                .filter(item => item.quantidade > 0)

        );

    }

    return (

        <CartContext.Provider

            value={{

                carrinho,

                adicionarProduto,

                removerProduto,

                aumentarQuantidade,

                diminuirQuantidade

            }}

        >

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {

    return useContext(CartContext);

}