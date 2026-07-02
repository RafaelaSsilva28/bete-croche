import "./ModalProduto.css";
import { useState, useEffect } from "react";
import {
    FaLeaf,
    FaTags,
    FaBoxOpen,
    FaCheckCircle
} from "react-icons/fa";

function ModalProduto({ aberto, produto, fechar }) {

    if (!aberto || !produto) return null;
    const imagens =
    produto.imagens && produto.imagens.length > 0
        ? produto.imagens
        : produto.imagem_principal
        ? [{ caminho_imagem: produto.imagem_principal }]
        : [];

const [imagemSelecionada, setImagemSelecionada] = useState(0);

useEffect(() => {
    setImagemSelecionada(0);
}, [produto]);
    const imagemPrincipal =
        produto.imagens && produto.imagens.length > 0
            ? produto.imagens.find(img => img.principal) || produto.imagens[0]
            : produto.imagem_principal
            ? { caminho_imagem: produto.imagem_principal }
            : null;
    
    return (

        <div className="overlay" onClick={fechar}>

            <div
                className="modalProduto"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className="btnFechar"
                    onClick={fechar}
                >
                    ✕
                </button>

               <div className="imagemProduto">

    <img
        src={
            imagens.length > 0
                ? `http://localhost:3001/uploads/${imagens[imagemSelecionada].caminho_imagem}`
                : "https://placehold.co/600x600"
        }
        alt={produto.nome}
    />
    <p>Quantidade de imagens: {imagens.length}</p>
    <div className="miniaturas">

        {imagens.map((img, index) => (

            <img
                key={index}
                src={`http://localhost:3001/uploads/${img.caminho_imagem}`}
                alt=""
                className={
                    imagemSelecionada === index
                        ? "miniatura ativa"
                        : "miniatura"
                }
                onClick={() => setImagemSelecionada(index)}
            />

        ))}

    </div>

</div>

                <div className="infoProduto">

                    <span className="tag">
                        🧶 Produto Artesanal
                    </span>

                    <h1>{produto.nome}</h1>

                    <h2>
                        R$ {Number(produto.preco).toFixed(2)}
                    </h2>

                    <p className="descricao">
                        {produto.descricao}
                    </p>

                    <div className="dados">

                        <div className="cardInfo">

                            <FaLeaf className="iconeInfo" />

                            <h4>Material</h4>

                            <p>{produto.material}</p>

                        </div>

                        <div className="cardInfo">

                            <FaTags className="iconeInfo" />

                            <h4>Categoria</h4>

                            <p>
                                {produto.categoria?.nome || produto.categoria}
                            </p>

                        </div>

                        <div className="cardInfo">

                            <FaBoxOpen className="iconeInfo" />

                            <h4>Entrega</h4>

                            <p>
                                {produto.tempo_producao || "Pronta entrega"}
                            </p>

                        </div>

                        <div className="cardInfo">

                            <FaCheckCircle className="iconeInfo" />

                            <h4>Disponibilidade</h4>

                            <p>
                                {produto.sob_encomenda
                                    ? "Sob encomenda"
                                    : "Em estoque"}
                            </p>

                        </div>

                    </div>

                    <button className="btnComprar">

                        💬 Comprar pelo WhatsApp

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ModalProduto;