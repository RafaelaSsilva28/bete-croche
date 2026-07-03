import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    return (

        <header className="navbar">

            <div className="logo">
                🧶 Elizabeth Crochê
            </div>

            <nav className="menu">

                <Link to="/">Início</Link>

                <Link to="/produtos">Produtos</Link>

                <Link to="/sobre">Sobre</Link>

                <a
                    href="https://wa.me/5518997269333"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Contato
                </a>

            </nav>

        </header>

    );

}

export default Navbar;