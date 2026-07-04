import "./Footer.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {

    return (

        <footer className="footer">

            <div className="footerConteudo">

                <span>
                    © 2026 Elizabeth Crochê • Todos os direitos reservados.
                </span>

                <div className="footerRedes">

                    <a
                        href="https://instagram.com/elizabetecroches"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaInstagram />
                    </a>

                    <a
                        href="https://wa.me/5518997269333"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaWhatsapp />
                    </a>

                </div>

            </div>

        </footer>

    );

}

export default Footer;