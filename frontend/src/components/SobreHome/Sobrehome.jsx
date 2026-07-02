import "./SobreHome.css";

function SobreHome() {

    return (

        <section className="sobreHome">

            <div className="sobreImagem">

                <img
                    src="https://placehold.co/500x600?text=Elizabeth+Crochê"
                    alt="Elizabeth Crochê"
                />

            </div>

            <div className="sobreTexto">

                <span>🧶 Feito com carinho</span>

                <h2>Nossa História</h2>

                <p>

                    A Elizabeth Crochê nasceu da paixão pelo artesanato e do
                    desejo de criar peças únicas, feitas manualmente com muito
                    amor, dedicação e atenção aos mínimos detalhes.

                </p>

                <p>

                    Cada criação é produzida cuidadosamente para proporcionar
                    beleza, qualidade e exclusividade, tornando cada peça
                    especial para quem a recebe.

                </p>

                <button>

                    Conheça Nossa História →

                </button>

            </div>

        </section>

    );

}

export default SobreHome;