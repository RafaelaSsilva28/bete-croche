import "./CardProduto.css";

import {
    FaEye,
    FaTag
} from "react-icons/fa";

function CardProduto({ produto, abrirProduto }) {

    return (

        <article className="cardProduto">

            <div className="imagemCardProduto">

                <img
                    src={
                        produto.imagem_principal
                            ? `http://localhost:3001/uploads/${produto.imagem_principal}`
                            : "https://placehold.co/400x400?text=Sem+imagem"
                    }
                    alt={produto.nome}
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