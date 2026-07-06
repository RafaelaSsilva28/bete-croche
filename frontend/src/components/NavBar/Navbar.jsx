import "./Navbar.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    FaBars,
    FaTimes,
    FaHome,
    FaBoxOpen,
    FaInfoCircle,
    FaWhatsapp
} from "react-icons/fa";

import { GiYarn } from "react-icons/gi";

function Navbar() {

    const [menuAberto, setMenuAberto] = useState(false);

    const location = useLocation();

    function fecharMenu() {

        setMenuAberto(false);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    useEffect(() => {

        setMenuAberto(false);

    }, [location.pathname]);

    useEffect(() => {

        if (menuAberto) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "auto";

        }

        return () => {

            document.body.style.overflow = "auto";

        };

    }, [menuAberto]);

    return (

        <>

            <header className="navbarPublica">

                <Link
                    to="/"
                    className="logoPublica"
                    onClick={fecharMenu}
                >

                    <div className="iconeLogoPublica">
                        <GiYarn />
                    </div>

                    <div className="textoLogoPublica">

                        <span className="nomeElizabeth">
                            Elizabeth
                        </span>

                        <strong className="nomeCroche">
                            Crochê
                        </strong>

                    </div>

                </Link>

                <nav className="menuPublicoDesktop">

                    <Link
                        to="/"
                        className={
                            location.pathname === "/"
                                ? "linkPublico ativo"
                                : "linkPublico"
                        }
                        onClick={fecharMenu}
                    >

                        <FaHome />

                        <span>Início</span>

                    </Link>

                    <Link
                        to="/produtos"
                        className={
                            location.pathname === "/produtos"
                                ? "linkPublico ativo"
                                : "linkPublico"
                        }
                        onClick={fecharMenu}
                    >

                        <FaBoxOpen />

                        <span>Produtos</span>

                    </Link>

                    <Link
                        to="/sobre"
                        className={
                            location.pathname === "/sobre"
                                ? "linkPublico ativo"
                                : "linkPublico"
                        }
                        onClick={fecharMenu}
                    >

                        <FaInfoCircle />

                        <span>Sobre</span>

                    </Link>

                    <a
                        href="https://wa.me/5518997269333"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="botaoContatoNavbar"
                    >

                        <FaWhatsapp />

                        <span>Contato</span>

                    </a>

                </nav>

                <button
                    type="button"
                    className="botaoMenuPublico"
                    onClick={() =>
                        setMenuAberto(true)
                    }
                    aria-label="Abrir menu"
                >

                    <FaBars />

                </button>

            </header>

            <div className="espacoNavbarPublica"></div>

            <div
                className={
                    menuAberto
                        ? "fundoMenuPublico ativo"
                        : "fundoMenuPublico"
                }
                onClick={() =>
                    setMenuAberto(false)
                }
            ></div>

            <aside
                className={
                    menuAberto
                        ? "menuLateralPublico aberto"
                        : "menuLateralPublico"
                }
            >

                <div className="cabecalhoMenuLateralPublico">

                    <Link
                        to="/"
                        className="logoMenuLateral"
                        onClick={fecharMenu}
                    >

                        <div className="iconeLogoLateral">
                            <GiYarn />
                        </div>

                        <div className="textoLogoLateral">

                            <span className="nomeElizabethLateral">
                                Elizabeth
                            </span>

                            <strong className="nomeCrocheLateral">
                                Crochê
                            </strong>

                        </div>

                    </Link>

                    <button
                        type="button"
                        className="fecharMenuPublico"
                        onClick={() =>
                            setMenuAberto(false)
                        }
                        aria-label="Fechar menu"
                    >

                        <FaTimes />

                    </button>

                </div>

                <nav className="linksMenuLateralPublico">

                    <Link
                        to="/"
                        className={
                            location.pathname === "/"
                                ? "linkLateralPublico ativo"
                                : "linkLateralPublico"
                        }
                        onClick={fecharMenu}
                    >

                        <div className="iconeLinkLateral">
                            <FaHome />
                        </div>

                        <span>Início</span>

                    </Link>

                    <Link
                        to="/produtos"
                        className={
                            location.pathname === "/produtos"
                                ? "linkLateralPublico ativo"
                                : "linkLateralPublico"
                        }
                        onClick={fecharMenu}
                    >

                        <div className="iconeLinkLateral">
                            <FaBoxOpen />
                        </div>

                        <span>Produtos</span>

                    </Link>

                    <Link
                        to="/sobre"
                        className={
                            location.pathname === "/sobre"
                                ? "linkLateralPublico ativo"
                                : "linkLateralPublico"
                        }
                        onClick={fecharMenu}
                    >

                        <div className="iconeLinkLateral">
                            <FaInfoCircle />
                        </div>

                        <span>Sobre</span>

                    </Link>

                    <a
                        href="https://wa.me/5518997269333"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkLateralPublico contatoLateral"
                        onClick={() =>
                            setMenuAberto(false)
                        }
                    >

                        <div className="iconeLinkLateral">
                            <FaWhatsapp />
                        </div>

                        <span>Contato</span>

                    </a>

                </nav>

                <div className="rodapeMenuLateralPublico">

                    <GiYarn />

                    <p>
                        Peças artesanais feitas com carinho.
                    </p>

                </div>

            </aside>

        </>

    );

}

export default Navbar;