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

                <Link to="/contato">Contato</Link>

            </nav>

        </header>
    );
}

export default Navbar;