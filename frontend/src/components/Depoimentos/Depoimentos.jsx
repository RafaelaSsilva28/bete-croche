import "./Depoimentos.css";

import {
    FaHeart,
    FaStar,
    FaQuoteLeft,
    FaUserCircle
} from "react-icons/fa";

function Depoimentos() {

    const depoimentos = [

        {
            nome: "Mariana Souza",
            texto:
                "Meu amigurumi ficou simplesmente perfeito! Dá para perceber o carinho colocado em cada detalhe."
        },

        {
            nome: "Juliana Lima",
            texto:
                "A bolsa ficou exatamente como imaginei. Atendimento excelente e acabamento impecável."
        },

        {
            nome: "Camila Oliveira",
            texto:
                "Produtos lindos, entrega rápida e muita qualidade. Recomendo demais!"
        }

    ];

    return (

        <section className="depoimentos">

            <div className="conteudoDepoimentos">

                <div className="cabecalhoDepoimentos">

                    <div className="subtituloDepoimentos">

                        <FaHeart />

                        <span>Clientes satisfeitos</span>

                    </div>

                    <h2>
                        O que dizem sobre nosso trabalho
                    </h2>

                    <p>
                        Cada peça é feita com cuidado, dedicação
                        e atenção aos mínimos detalhes.
                    </p>

                </div>

                <div className="cardsDepoimentos">

                    {depoimentos.map((depoimento, indice) => (

                        <article
                            className="cardDepoimento"
                            key={indice}
                        >

                            <div className="topoCardDepoimento">

                                <div className="iconeAspasDepoimento">
                                    <FaQuoteLeft />
                                </div>

                                <div className="estrelasDepoimento">

                                    {[1, 2, 3, 4, 5].map((estrela) => (

                                        <FaStar key={estrela} />

                                    ))}

                                </div>

                            </div>

                            <p className="textoDepoimento">
                                “{depoimento.texto}”
                            </p>

                            <div className="clienteDepoimento">

                                <div className="iconeClienteDepoimento">
                                    <FaUserCircle />
                                </div>

                                <div>

                                    <strong>
                                        {depoimento.nome}
                                    </strong>

                                    <span>Cliente Elizabeth Crochê</span>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Depoimentos;