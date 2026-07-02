import "./CardProduto.css";
import { useNavigate } from "react-router-dom";

function CardProduto({ produto }) {

    const navigate = useNavigate();

    return (

        <div className="cardProduto">

            <img
                src={
                    produto.imagem_principal
                        ? `http://localhost:3001/uploads/${produto.imagem_principal}`
                        : "https://placehold.co/300x300"
                }
                alt={produto.nome}
            />

            <h3>{produto.nome}</h3>

            <p>{produto.descricao}</p>

            <span>
                R$ {Number(produto.preco).toFixed(2)}
            </span>

            <button onClick={() => navigate(`/produtos/${produto.id_produto}`)}>
                Ver Produto
            </button>

        </div>

    );

}

export default CardProduto;