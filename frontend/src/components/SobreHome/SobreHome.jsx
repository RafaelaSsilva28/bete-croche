import "./SobreHome.css";

import { useNavigate } from "react-router-dom";

import {
    FaHeart,
    FaArrowRight,
    FaCheckCircle
} from "react-icons/fa";

import { GiYarn } from "react-icons/gi";

function SobreHome() {

    const navigate = useNavigate();

    function irParaSobre() {

        navigate("/sobre");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    return (

        <section className="sobreHome">

            <div className="sobreHomeConteudo">

                <div className="sobreImagem">

                    <div className="decoracaoImagemSobre"></div>

                    <img
                        src="/IMG_HOME.webp"
                        alt="Peças artesanais da Elizabeth Crochê"
                    />

                    <div className="seloImagemSobre">

                        <div className="iconeSeloSobre">
                            <GiYarn />
                        </div>

                        <div>
                            <strong>Feito à mão</strong>
                            <span>com carinho e dedicação</span>
                        </div>

                    </div>

                </div>

                <div className="sobreTexto">

                    <div className="subtituloSobreHome">

                        <FaHeart />

                        <span>Feito com carinho</span>

                    </div>

                    <h2>
                        Nossa história é feita
                        <strong> ponto por ponto</strong>
                    </h2>

                    <p>
                        A Elizabeth Crochê nasceu da paixão pelo artesanato
                        e do desejo de criar peças únicas, produzidas
                        manualmente com dedicação e atenção aos mínimos detalhes.
                    </p>

                    <p>
                        Cada criação é preparada cuidadosamente para oferecer
                        beleza, qualidade e exclusividade, tornando cada peça
                        especial para quem a recebe.
                    </p>

                    <div className="diferenciaisSobreHome">

                        <div className="diferencialSobreHome">

                            <FaCheckCircle />

                            <span>Produção totalmente artesanal</span>

                        </div>

                        <div className="diferencialSobreHome">

                            <FaCheckCircle />

                            <span>Peças únicas e personalizadas</span>

                        </div>

                        <div className="diferencialSobreHome">

                            <FaCheckCircle />

                            <span>Cuidado em cada acabamento</span>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="btnHistoria"
                        onClick={irParaSobre}
                    >

                        <span>Conheça nossa história</span>

                        <FaArrowRight />

                    </button>

                </div>

            </div>

        </section>

    );

}

export default SobreHome;