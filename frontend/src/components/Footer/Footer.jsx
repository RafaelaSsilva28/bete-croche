import "./Footer.css";

import {
    FaInstagram,
    FaWhatsapp
} from "react-icons/fa";

import { GiYarn } from "react-icons/gi";

function Footer() {

    return (

        <footer className="footer">

            <div className="footerConteudo">

                <div className="footerPrincipal">

                    <div className="footerMarca">

                        <div className="footerIconeMarca">
                            <GiYarn />
                        </div>

                        <div className="footerNomeMarca">

                            <strong>Elizabeth</strong>

                            <span>Crochê</span>

                        </div>

                    </div>

                    <p className="footerDescricao">
                        Peças artesanais feitas com cuidado,
                        carinho e dedicação.
                    </p>

                    <div className="footerRedes">

                        <a
                            href="https://instagram.com/elizabetecroches"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram da Elizabeth Crochê"
                            title="Instagram"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://wa.me/5518997269333"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp da Elizabeth Crochê"
                            title="WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>

                    </div>

                </div>

                <div className="footerMensagem">

                    <h3>Artesanato feito especialmente para você</h3>

                    <p>
                        Entre em contato pelas nossas redes sociais
                        para conhecer as peças e fazer seu pedido.
                    </p>

                </div>

            </div>

            <div className="footerLinha"></div>

            <div className="footerInferior">

                <span>
                    © 2026 Elizabeth Crochê
                </span>

                <span>
                    Todos os direitos reservados.
                </span>

            </div>

        </footer>

    );

}

export default Footer;