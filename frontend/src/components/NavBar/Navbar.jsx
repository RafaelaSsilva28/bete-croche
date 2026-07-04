import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <header className="navbar">

            <div className="logo">
                🧶 Elizabeth Crochê
            </div>

            <nav className="menu">

                <Link to="/" onClick={() => {
                 console.log("CLIQUE INICIO");
           window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
                }}>Início</Link>
                <Link to="/produtos" onClick={() => {
                 console.log("CLIQUE PRODUTOS");
           window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
                }}>Produtos</Link>
                <Link to="/sobre" onClick={() => {
                 console.log("CLIQUE SOBRE");
           window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
                }}>Sobre</Link>

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