import "./Diferenciais.css";
import {
    FaHeart,
    FaLeaf,
    FaGift,
    FaStar
} from "react-icons/fa";

function Diferenciais() {

    return (

        <section className="diferenciais">

            <h2>Por que escolher a Elizabeth Crochê?</h2>

            <p>
                Cada peça é criada pensando em oferecer qualidade,
                beleza e exclusividade para nossos clientes.
            </p>

            <div className="cardsDiferenciais">

                <div className="cardDiferencial">

                    <FaHeart className="icone"/>

                    <h3>Feito com Amor</h3>

                    <p>
                        Cada detalhe é produzido manualmente com muito carinho.
                    </p>

                </div>

                <div className="cardDiferencial">

                    <FaLeaf className="icone"/>

                    <h3>Materiais Premium</h3>

                    <p>
                        Trabalhamos apenas com fios de excelente qualidade.
                    </p>

                </div>

                <div className="cardDiferencial">

                    <FaGift className="icone"/>

                    <h3>Personalização</h3>

                    <p>
                        Produzimos peças exclusivas do jeitinho que você deseja.
                    </p>

                </div>

                <div className="cardDiferencial">

                    <FaStar className="icone"/>

                    <h3>Atendimento Humanizado</h3>

                    <p>
                        Atendimento próximo, rápido e com muito carinho.
                    </p>

                </div>

            </div>

        </section>

    );

}

export default Diferenciais;