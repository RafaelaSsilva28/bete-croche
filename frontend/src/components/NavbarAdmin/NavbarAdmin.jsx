import "./NavbarAdmin.css";

import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    FaBars,
    FaTimes,
    FaHome,
    FaBoxOpen,
    FaFolderOpen,
    FaCog,
    FaWhatsapp,
    FaSignOutAlt
} from "react-icons/fa";

function NavbarAdmin() {

    const [menuAberto, setMenuAberto] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    function fecharMenu() {

        setMenuAberto(false);

    }

    function sair() {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        setMenuAberto(false);

        navigate("/login");

    }

    function verificarRotaAtiva(rota) {

        if (rota === "/admin") {
            return location.pathname === "/admin";
        }

        return location.pathname.startsWith(rota);

    }

    return (

        <header className="navbarAdmin">

            <Link
                to="/admin"
                className="logoNavbarAdmin"
                onClick={fecharMenu}
            >
                Elizabeth Crochê
            </Link>

            <button
                type="button"
                className="btnMenuAdmin"
                onClick={() =>
                    setMenuAberto((anterior) => !anterior)
                }
                aria-label={
                    menuAberto
                        ? "Fechar menu administrativo"
                        : "Abrir menu administrativo"
                }
            >
                {menuAberto ? (
                    <FaTimes />
                ) : (
                    <FaBars />
                )}
            </button>

            <nav
                className={
                    menuAberto
                        ? "menuAdmin ativo"
                        : "menuAdmin"
                }
            >

                <Link
                    to="/admin"
                    className={
                        verificarRotaAtiva("/admin")
                            ? "ativo"
                            : ""
                    }
                    onClick={fecharMenu}
                >
                    <FaHome />
                    Dashboard
                </Link>

                <Link
                    to="/admin/produtos"
                    className={
                        verificarRotaAtiva("/admin/produtos")
                            ? "ativo"
                            : ""
                    }
                    onClick={fecharMenu}
                >
                    <FaBoxOpen />
                    Produtos
                </Link>

                <Link
                    to="/admin/categorias"
                    className={
                        verificarRotaAtiva("/admin/categorias")
                            ? "ativo"
                            : ""
                    }
                    onClick={fecharMenu}
                >
                    <FaFolderOpen />
                    Categorias
                </Link>

                <Link
                    to="/admin/configuracoes"
                    className={
                        verificarRotaAtiva("/admin/configuracoes")
                            ? "ativo"
                            : ""
                    }
                    onClick={fecharMenu}
                >
                    <FaCog />
                    Configurações
                </Link>

                <a
                    href="https://web.whatsapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={fecharMenu}
                >
                    <FaWhatsapp />
                    WhatsApp
                </a>

                <button
                    type="button"
                    className="btnSairAdmin"
                    onClick={sair}
                >
                    <FaSignOutAlt />
                    Sair
                </button>

            </nav>

            {menuAberto && (

                <button
                    type="button"
                    className="overlayMenuAdmin"
                    onClick={fecharMenu}
                    aria-label="Fechar menu"
                />

            )}

        </header>

    );

}

export default NavbarAdmin;