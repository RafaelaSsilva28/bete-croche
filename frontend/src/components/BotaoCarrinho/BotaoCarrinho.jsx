import "./BotaoCarrinho.css";
import { FaShoppingCart } from "react-icons/fa";

function BotaoCarrinho({ abrir }) {

    return (

        <button
            className="botaoCarrinho"
            onClick={abrir}
        >
            <FaShoppingCart />
        </button>

    );

}

export default BotaoCarrinho;