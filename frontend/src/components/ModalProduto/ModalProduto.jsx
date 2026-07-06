import "./ModalProduto.css";

import { useEffect, useState } from "react";

import {
    FaLeaf,
    FaTags,
    FaBoxOpen,
    FaCheckCircle,
    FaShoppingCart,
    FaWhatsapp,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
    FaMinus,
    FaPlus
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";

function ModalProduto({ aberto, produto, fechar }) {

    const { adicionarProduto } = useCart();

    const [quantidade, setQuantidade] = useState(1);
    const [imagemSelecionada, setImagemSelecionada] = useState(0);
    const [toast, setToast] = useState(false);

    useEffect(() => {

        if (produto) {

            setImagemSelecionada(0);
            setQuantidade(1);

        }

    }, [produto]);

    useEffect(() => {

        if (!aberto) {
            return;
        }

        document.body.style.overflow = "hidden";

        function fecharComEsc(evento) {

            if (evento.key === "Escape") {
                fechar();
            }

        }

        window.addEventListener("keydown", fecharComEsc);

        return () => {

            document.body.style.overflow = "auto";

            window.removeEventListener(
                "keydown",
                fecharComEsc
            );

        };

    }, [aberto, fechar]);

    if (!aberto || !produto) {
        return null;
    }

    const imagens =
        produto.imagens && produto.imagens.length > 0
            ? produto.imagens
            : produto.imagem_principal
                ? [
                    {
                        caminho_imagem:
                            produto.imagem_principal
                    }
                ]
                : [];

    function proximaImagem() {

        setImagemSelecionada((anterior) =>
            anterior === imagens.length - 1
                ? 0
                : anterior + 1
        );

    }

    function imagemAnterior() {

        setImagemSelecionada((anterior) =>
            anterior === 0
                ? imagens.length - 1
                : anterior - 1
        );

    }

    const preco = Number(
        String(produto.preco).replace(",", ".")
    );

    const precoSeguro = Number.isNaN(preco)
        ? 0
        : preco;

    const total = precoSeguro * quantidade;

    function diminuirQuantidade() {

        setQuantidade((anterior) =>
            anterior > 1
                ? anterior - 1
                : 1
        );

    }

    function aumentarQuantidade() {

        setQuantidade((anterior) =>
            anterior + 1
        );

    }

    function adicionarAoCarrinho() {

        adicionarProduto(
            produto,
            quantidade
        );

        setToast(true);

        setTimeout(() => {

            setToast(false);
            fechar();

        }, 1000);

    }

    function abrirWhatsapp() {

        const numeroWhatsapp = "5518997269333";

        const mensagem = `Olá, Elizabete! Vim pelo site e gostaria de saber mais sobre esta encomenda.

Produto: ${produto.nome}
Quantidade: ${quantidade}
Valor unitário: R$ ${precoSeguro.toFixed(2)}
Valor total: R$ ${total.toFixed(2)}

Gostaria de mais informações sobre disponibilidade, prazo e personalização.`;

        const linkWhatsapp =
            `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(
                mensagem
            )}`;

        window.open(
            linkWhatsapp,
            "_blank",
            "noopener,noreferrer"
        );

    }

    return (

        <div
            className="overlayProduto"
            onClick={fechar}
        >

            {toast && (

                <div className="toastProduto">

                    <FaCheckCircle />

                    <span>
                        Produto adicionado ao carrinho
                    </span>

                </div>

            )}

            <article
                className="modalProduto"
                onClick={(evento) =>
                    evento.stopPropagation()
                }
            >

                <button
                    type="button"
                    className="btnFecharProduto"
                    onClick={fechar}
                    aria-label="Fechar produto"
                >
                    <FaTimes />
                </button>

                <div className="ladoImagemProduto">

                    <div className="areaImagemProduto">

                        {imagens.length > 1 && (

                            <button
                                type="button"
                                className="setaImagemProduto esquerda"
                                onClick={imagemAnterior}
                                aria-label="Imagem anterior"
                            >
                                <FaChevronLeft />
                            </button>

                        )}

                        <img
                            src={
                                imagens.length > 0
                                    ? `http://localhost:3001/uploads/${imagens[imagemSelecionada].caminho_imagem}`
                                    : "https://placehold.co/600x600?text=Sem+imagem"
                            }
                            alt={produto.nome}
                        />

                        {imagens.length > 1 && (

                            <button
                                type="button"
                                className="setaImagemProduto direita"
                                onClick={proximaImagem}
                                aria-label="Próxima imagem"
                            >
                                <FaChevronRight />
                            </button>

                        )}

                    </div>

                    {imagens.length > 1 && (

                        <div className="indicadoresImagemProduto">

                            {imagens.map((imagem, indice) => (

                                <button
                                    type="button"
                                    key={
                                        imagem.id_imagem ||
                                        imagem.caminho_imagem ||
                                        indice
                                    }
                                    className={
                                        imagemSelecionada === indice
                                            ? "indicadorImagem ativo"
                                            : "indicadorImagem"
                                    }
                                    onClick={() =>
                                        setImagemSelecionada(indice)
                                    }
                                    aria-label={`Selecionar imagem ${indice + 1}`}
                                ></button>

                            ))}

                        </div>

                    )}

                    <button
                        type="button"
                        className="btnWhatsappProdutoModal"
                        onClick={abrirWhatsapp}
                    >

                        <FaWhatsapp />

                        <span>
                            Pedir pelo WhatsApp
                        </span>

                    </button>

                </div>

                <div className="infoProduto">

                    <span className="tagProdutoModal">
                        Produto artesanal
                    </span>

                    <h1>{produto.nome}</h1>

                    <div className="precoUnitarioProduto">

                        <span>Preço unitário</span>

                        <strong>
                            R$ {precoSeguro.toFixed(2)}
                        </strong>

                    </div>

                    <p className="descricaoProdutoModal">
                        {produto.descricao}
                    </p>

                    <div className="areaQuantidadeProduto">

                        <div>

                            <span className="tituloQuantidadeProduto">
                                Quantidade
                            </span>

                            <div className="controleQuantidade">

                                <button
                                    type="button"
                                    onClick={diminuirQuantidade}
                                    disabled={quantidade === 1}
                                    aria-label="Diminuir quantidade"
                                >
                                    <FaMinus />
                                </button>

                                <span>{quantidade}</span>

                                <button
                                    type="button"
                                    onClick={aumentarQuantidade}
                                    aria-label="Aumentar quantidade"
                                >
                                    <FaPlus />
                                </button>

                            </div>

                        </div>

                        <div className="totalProdutoModal">

                            <span>Total</span>

                            <strong>
                                R$ {total.toFixed(2)}
                            </strong>

                        </div>

                    </div>

                    <div className="dadosProdutoModal">

                        <div className="cardInfoProduto">

                            <FaLeaf />

                            <div>

                                <h4>Material</h4>

                                <p>
                                    {produto.material ||
                                        "Não informado"}
                                </p>

                            </div>

                        </div>

                        <div className="cardInfoProduto">

                            <FaTags />

                            <div>

                                <h4>Categoria</h4>

                                <p>
                                    {produto.categoria?.nome ||
                                        produto.categoria ||
                                        "Não informada"}
                                </p>

                            </div>

                        </div>

                        <div className="cardInfoProduto">

                            <FaBoxOpen />

                            <div>

                                <h4>Produção</h4>

                                <p>
                                    {produto.tempo_producao ||
                                        "Pronta entrega"}
                                </p>

                            </div>

                        </div>

                        <div className="cardInfoProduto">

                            <FaCheckCircle />

                            <div>

                                <h4>Disponibilidade</h4>

                                <p>
                                    {produto.sob_encomenda
                                        ? "Sob encomenda"
                                        : "Em estoque"}
                                </p>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="btnComprarProduto"
                        onClick={adicionarAoCarrinho}
                    >

                        <FaShoppingCart />

                        <span>
                            Adicionar ao carrinho
                        </span>

                    </button>

                </div>

            </article>

        </div>

    );

}

export default ModalProduto;