import "./ChamadaWhatsapp.css";

import {
    FaInstagram,
    FaArrowRight,
    FaHeart
} from "react-icons/fa";

function ChamadaWhatsapp() {

    return (

        <section className="chamadaWhatsapp">

            <div className="decoracaoInstagram decoracaoInstagramUm"></div>
            <div className="decoracaoInstagram decoracaoInstagramDois"></div>

            <div className="conteudoChamadaInstagram">

                <div className="iconePrincipalInstagram">
                    <FaInstagram />
                </div>

                <span className="subtituloInstagram">

                    <FaHeart />

                    Acompanhe nosso trabalho

                </span>

                <h2>
                    Nosso trabalho continua no Instagram
                </h2>

                <p>
                    Descubra novas peças, acompanhe os bastidores
                    do ateliê, veja lançamentos exclusivos e inspire-se
                    com cada criação publicada em nosso perfil.
                </p>

                <a
                    href="https://instagram.com/elizabetecroches"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="botaoInstagram"
                >

                    <FaInstagram />

                    <span>Ver perfil no Instagram</span>

                    <FaArrowRight />

                </a>

            </div>

        </section>

    );

}

export default ChamadaWhatsapp;