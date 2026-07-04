import "./ModalCarrinho.css";

import {
    FaTimes,
    FaShoppingCart,
    FaWhatsapp,
    FaTrash,
    FaPlus,
    FaMinus
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";

function ModalCarrinho({ aberto, fechar }) {

    const {

        carrinho,

        aumentarQuantidade,

        diminuirQuantidade,

        removerProduto,

        removerSelecionados,

        selecionarProduto,

        selecionarTodos

    } = useCart();

    if (!aberto) return null;

    const produtosSelecionados = carrinho.filter(
        item => item.selecionado
    );

    const totalCarrinho = produtosSelecionados.reduce(

        (total, item) =>

            total +

            Number(item.preco) *

            item.quantidade,

        0

    );

    const mensagem = `Olá Elizabeth! 👋

Vim pelo seu site e gostaria de fazer uma encomenda.

${produtosSelecionados.map(item =>

`🧶 ${item.nome}
Quantidade: ${item.quantidade}
Valor Unitário: R$ ${Number(item.preco).toFixed(2)}
Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}
`

).join("\n")}

💰 Total da Compra: R$ ${totalCarrinho.toFixed(2)}

Aguardo seu retorno 😊`;

    const linkWhatsapp =

        `https://wa.me/5518997269333?text=${encodeURIComponent(mensagem)}`;

    return (

        <div
            className="overlayCarrinho"
            onClick={fechar}
        >

            <div
                className="modalCarrinho"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className="btnFecharCarrinho"
                    onClick={fechar}
                >

                    <FaTimes />

                </button>

                <h2 className="tituloCarrinho">

                    <FaShoppingCart />

                    Meu Carrinho

                </h2>

                <div className="topoCarrinho">

                    <div>

                        <p>Total Selecionado</p>

                        <h3>

                            R$ {totalCarrinho.toFixed(2)}

                        </h3>

                    </div>

                    <a

                        href={linkWhatsapp}

                        target="_blank"

                        rel="noopener noreferrer"

                        className="btnWhatsappCarrinho"

                    >

                        <FaWhatsapp />

                        Finalizar pelo WhatsApp

                    </a>

                </div>

                <div className="selecionarTodos">

                    <label>

                        <input

                            type="checkbox"

                            checked={

                                carrinho.length > 0 &&

                                carrinho.every(

                                    item => item.selecionado

                                )

                            }

                            onChange={selecionarTodos}

                        />

                        Selecionar todos

                    </label>

                    <button

                        className="btnExcluirSelecionados"

                        onClick={removerSelecionados}

                        title="Excluir selecionados"

                    >

                        <FaTrash />

                    </button>

                </div>

                <div className="listaCarrinho">
                    {carrinho.length === 0 ? (

    <div className="carrinhoVazio">

        <FaShoppingCart className="iconeVazio" />

        <h3>Seu carrinho está vazio</h3>

        <p>

            Adicione alguns produtos para começar sua encomenda.

        </p>

    </div>

) : (

    carrinho.map((produto) => (

        <div

            className="itemCarrinho"

            key={produto.id_produto}

        >

            <input

                type="checkbox"

                className="checkboxCarrinho"

                checked={produto.selecionado}

                onChange={() =>

                    selecionarProduto(produto.id_produto)

                }

            />

            <img

                src={

                    produto.imagens?.length > 0

                        ? `http://localhost:3001/uploads/${produto.imagens.find(img => img.principal)?.caminho_imagem || produto.imagens[0].caminho_imagem}`

                        : "https://placehold.co/150x150"

                }

                alt={produto.nome}

            />

            <div className="dadosCarrinho">

                <h3>{produto.nome}</h3>

                <p>

                    Valor Unitário:

                    <strong>

                        {" "}R$

                        {Number(produto.preco).toFixed(2)}

                    </strong>

                </p>

                <div className="quantidadeCarrinho">

                    <button

                        onClick={() =>

                            diminuirQuantidade(

                                produto.id_produto

                            )

                        }

                    >

                        <FaMinus />

                    </button>

                    <span>

                        {produto.quantidade}

                    </span>

                    <button

                        onClick={() =>

                            aumentarQuantidade(

                                produto.id_produto

                            )

                        }

                    >

                        <FaPlus />

                    </button>

                </div>

                <h4>

                    Subtotal:

                    {" "}

                    R$

                    {(
                        Number(produto.preco) *

                        produto.quantidade

                    ).toFixed(2)}

                </h4>

            </div>

            <button

                className="btnExcluir"

                onClick={() =>

                    removerProduto(

                        produto.id_produto

                    )

                }

            >

                <FaTrash />

            </button>

        </div>

    ))

)}
                </div>

            </div>

        </div>

    );

}

export default ModalCarrinho;
       
