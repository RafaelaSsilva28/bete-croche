import "./ChamadaWhatsapp.css";
import { FaInstagram } from "react-icons/fa";

function ChamadaWhatsapp() {

    return (

        <section className="chamadaWhatsapp">

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
                rel="noreferrer"
            >

                <FaInstagram />

                Ver perfil no Instagram

            </a>

        </section>

    );

}

export default ChamadaWhatsapp;