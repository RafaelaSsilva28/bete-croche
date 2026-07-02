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
                    src="https://m.magazineluiza.com.br/a-static/420x420/kit-2-capas-para-almofada-folha-de-uva-cru-40x40cm-croche-artesanal-maria-croche-veronez/crochemariaveronez/2189/9a2a92436151d1dbb7b4c97dafc0977f.jpeg"
                    alt="Crochê artesanal"
                />

            </div>

        </section>
    );
}

export default Hero;