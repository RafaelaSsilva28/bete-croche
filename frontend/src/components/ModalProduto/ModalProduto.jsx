import "./ModalProduto.css";
import { useState, useEffect } from "react";
import {
    FaLeaf,
    FaTags,
    FaBoxOpen,
    FaCheckCircle,
    FaShoppingCart
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

    if (!aberto || !produto) return null;

    // =========================
    // IMAGENS
    // =========================
    const imagens =
        produto.imagens && produto.imagens.length > 0
            ? produto.imagens
            : produto.imagem_principal
                ? [{ caminho_imagem: produto.imagem_principal }]
                : [];

    // =========================
    // CONTROLE DE IMAGENS
    // =========================
    const proximaImagem = () => {
        setImagemSelecionada((prev) =>
            prev === imagens.length - 1 ? 0 : prev + 1
        );
    };

    const imagemAnterior = () => {
        setImagemSelecionada((prev) =>
            prev === 0 ? imagens.length - 1 : prev - 1
        );
    };

    // =========================
    // PREÇO SEGURO
    // =========================
    const preco = Number(String(produto.preco).replace(",", "."));
    const total = preco * quantidade;

    // =========================
    // ADICIONAR AO CARRINHO
    // =========================
    function adicionarAoCarrinho() {

        adicionarProduto(produto, quantidade);

        setToast(true);

        setTimeout(() => {
            setToast(false);
            fechar();
        }, 900);
    }

    return (

        <div className="overlay" onClick={fechar}>

            {/* TOAST */}
            {toast && (
                <div className="toast">
                    <FaCheckCircle className="toastIcon" />
                    <span>Produto adicionado ao carrinho</span>
                </div>
            )}

            <div
                className="modalProduto"
                onClick={(e) => e.stopPropagation()}
            >

                <button className="btnFechar" onClick={fechar}>
                    ✕
                </button>

               {/* =========================
    IMAGEM
========================= */}
<div className="imagemProduto">

    {imagens.length > 1 && (
        <button
            className="seta esquerda"
            onClick={imagemAnterior}
        >
            ❮
        </button>
    )}

    <img
        src={
            imagens.length > 0
                ? `http://localhost:3001/uploads/${imagens[imagemSelecionada].caminho_imagem}`
                : "https://placehold.co/600x600"
        }
        alt={produto.nome}
    />

    {imagens.length > 1 && (
        <button
            className="seta direita"
            onClick={proximaImagem}
        >
            ❯
        </button>
    )}

    {/* 🔥 AQUI ENTRA OS PONTINHOS (DOTS) */}
    {imagens.length > 1 && (
        <div className="bolinhas">
            {imagens.map((_, index) => (
                <span
                    key={index}
                    className={
                        imagemSelecionada === index
                            ? "bolinha ativa"
                            : "bolinha"
                    }
                    onClick={() => setImagemSelecionada(index)}
                />
            ))}
        </div>
    )}
    {/* =========================
                        BOTÃO ZAP OBS:ARRUMARR
                    ========================= */}
                    <button
                        className="btnWhatsapp"
                        onClick={adicionarAoCarrinho}
                    >
                        <FaShoppingCart style={{ marginRight: "8px" }} />
                        Adicionar ao Carrinho
                    </button>

</div>

                {/* =========================
                    INFO
                ========================= */}
                <div className="infoProduto">

                    <span className="tag">
                        Produto Artesanal
                    </span>

                    <h1>{produto.nome}</h1>

                    {/* PREÇO UNITÁRIO */}
                    <p style={{ color: "#777" }}>Preço unitário</p>
                    <h2>R$ {preco.toFixed(2)}</h2>

                    {/* QUANTIDADE */}
                    <p style={{ marginTop: "15px", color: "#777" }}>
                        Quantidade
                    </p>

                    <div className="controleQuantidade">

                        <button
                            onClick={() =>
                                quantidade > 1 && setQuantidade(quantidade - 1)
                            }
                        >
                            −
                        </button>

                        <span>{quantidade}</span>

                        <button
                            onClick={() => setQuantidade(quantidade + 1)}
                        >
                            +
                        </button>

                    </div>

                    {/* TOTAL */}
                    <p style={{ color: "#777" }}>Total</p>
                    <h2>R$ {total.toFixed(2)}</h2>

                    <p className="descricao">{produto.descricao}</p>

                    {/* =========================
                        DADOS
                    ========================= */}
                    <div className="dados">

                        <div className="cardInfo">                          <FaLeaf className="iconeInfo" />
                            <h4>Material</h4>                           <p>{produto.material}</p>
                        </div>

                        <div className="cardInfo">                          <FaTags className="iconeInfo" />
                            <h4>Categoria</h4>
                            <p>{produto.categoria?.nome || produto.categoria}</p>
                        </div>

                        <div className="cardInfo">                          <FaBoxOpen className="iconeInfo" />
                            <h4>Entrega</h4>
                            <p>{produto.tempo_producao || "Pronta entrega"}</p>
                        </div>

                        <div className="cardInfo">
                            <FaCheckCircle className="iconeInfo" />                          <h4>Disponibilidade</h4>
                            <p>
                                {produto.sob_encomenda
                                    ? "Sob encomenda"
                                    : "Em estoque"}
                            </p>                      </div>

                    </div>

                    {/* =========================
                        BOTÃO CARRINHO
                    ========================= */}
                    <button
                        className="btnComprar"
                        onClick={adicionarAoCarrinho}
                    >
                        <FaShoppingCart style={{ marginRight: "8px" }} />
                        Adicionar ao Carrinho
                    </button>

                </div>

            </div>

        </div>
    );}

export default ModalProduto;