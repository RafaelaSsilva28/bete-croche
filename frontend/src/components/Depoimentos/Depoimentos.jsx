import "./Depoimentos.css";

function Depoimentos() {

    return (

        <section className="depoimentos">

            <span className="subtitulo">
                ❤️ Clientes Satisfeitos
            </span>

            <h2>
                O que dizem sobre nosso trabalho
            </h2>

            <div className="cardsDepoimentos">

                <div className="cardDepoimento">

                    <div className="estrelas">
                        ⭐⭐⭐⭐⭐
                    </div>

                    <p>

                        "Meu amigurumi ficou simplesmente perfeito! Dá para perceber
                        o carinho colocado em cada detalhe."

                    </p>

                    <h4>
                        — Mariana Souza
                    </h4>

                </div>

                <div className="cardDepoimento">

                    <div className="estrelas">
                        ⭐⭐⭐⭐⭐
                    </div>

                    <p>

                        "A bolsa ficou exatamente como imaginei. Atendimento excelente
                        e acabamento impecável."

                    </p>

                    <h4>
                        — Juliana Lima
                    </h4>

                </div>

                <div className="cardDepoimento">

                    <div className="estrelas">
                        ⭐⭐⭐⭐⭐
                    </div>

                    <p>

                        "Produtos lindos, entrega rápida e muita qualidade.
                        Recomendo demais!"

                    </p>

                    <h4>
                        — Camila Oliveira
                    </h4>

                </div>

            </div>

        </section>

    );

}

export default Depoimentos;