import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-texto">

                <h1>
                    Feito à mão,
                    <br />
                    com muito carinho. 
                </h1>

                <p>
                    Descubra peças artesanais exclusivas,
                    produzidas com dedicação para tornar
                    cada momento ainda mais especial.
                </p>

                <Link to="/produtos" className="btnHero">
                    Ver Produtos
                </Link>

            </div>

            <div className="hero-imagem">

                <img
                    src="public/elizabete.jpg"
                    alt="Crochê artesanal"
                />

            </div>

        </section>
    );
}

export default Hero;