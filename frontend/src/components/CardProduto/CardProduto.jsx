import "./CardProduto.css";

import {
    FaEye,
    FaTag
} from "react-icons/fa";

import { API_URL } from "../../services/api";

function CardProduto({ produto, abrirProduto }) {

    const caminhoImagem = produto.imagem_principal
        ? produto.imagem_principal
            .replace(/^\/+/, "")
            .replace(/^uploads\//, "")
        : null;

    const urlImagem = caminhoImagem
        ? `${API_URL}/uploads/${caminhoImagem}`
        : "https://placehold.co/400x400?text=Sem+imagem";

    return (

        <article className="cardProduto">

            <div className="imagemCardProduto">

                <img
                    src={urlImagem}
                    alt={produto.nome}
                    onError={(evento) => {

                        evento.currentTarget.src =
                            "https://placehold.co/400x400?text=Sem+imagem";

                    }}
                />

                {produto.destaque === true && (

                    <div className="seloCardProduto">

                        <FaTag />

                        <span>Destaque</span>

                    </div>

                )}

            </div>

            <div className="conteudoCardProduto">

                <h3>{produto.nome}</h3>

                <p className="descricaoCardProduto">
                    {produto.descricao}
                </p>

                <div className="precoCardProduto">

                    <span>A partir de</span>

                    <strong>
                        R$ {Number(produto.preco).toFixed(2)}
                    </strong>

                </div>

                <button
                    type="button"
                    className="botaoVerProduto"
                    onClick={() => abrirProduto(produto)}
                >

                    <FaEye />

                    <span>Ver produto</span>

                </button>

            </div>

        </article>

    );

}

export default CardProduto;