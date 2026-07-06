import "./Hero.css";

import { Link } from "react-router-dom";

import {
    FaArrowRight,
    FaHeart,
    FaCheckCircle
} from "react-icons/fa";

import { GiYarn } from "react-icons/gi";

function Hero() {

    return (

        <section className="hero">

            <div className="heroConteudo">

                <div className="heroTexto">

                    <div className="seloHero">

                        <FaHeart />

                        <span>
                            Feito à mão com dedicação
                        </span>

                    </div>

                    <h1>

                        Peças artesanais feitas

                        <strong>
                            com carinho
                        </strong>

                        para você.

                    </h1>

                    <p>
                        Descubra peças exclusivas produzidas manualmente
                        com cuidado, qualidade e atenção em cada detalhe.
                    </p>

                    <div className="beneficiosHero">

                        <div className="beneficioHero">

                            <FaCheckCircle />

                            <span>Produção artesanal</span>

                        </div>

                        <div className="beneficioHero">

                            <FaCheckCircle />

                            <span>Peças exclusivas</span>

                        </div>

                        <div className="beneficioHero">

                            <FaCheckCircle />

                            <span>Feito com carinho</span>

                        </div>

                    </div>

                    <div className="botoesHero">

                        <Link
                            to="/produtos"
                            className="btnHero"
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                });
                            }}
                        >

                            <span>Ver produtos</span>

                            <FaArrowRight />

                        </Link>

                        <Link
                            to="/sobre"
                            className="btnHeroSecundario"
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                });
                            }}
                        >

                            Conheça nossa história

                        </Link>

                    </div>

                </div>

                <div className="heroImagem">

                    <div className="decoracaoHeroImagem"></div>

                    <img
                        src="/elizabete.jpg"
                        alt="Trabalho artesanal em crochê"
                    />

                    <div className="cardFlutuanteHero">

                        <div className="iconeCardHero">
                            <GiYarn />
                        </div>

                        <div>

                            <strong>Elizabeth Crochê</strong>

                            <span>
                                Artesanato feito com cuidado
                            </span>

                        </div>

                    </div>

                    <div className="detalheHero detalheHeroUm"></div>
                    <div className="detalheHero detalheHeroDois"></div>

                </div>

            </div>

        </section>

    );

}

export default Hero;