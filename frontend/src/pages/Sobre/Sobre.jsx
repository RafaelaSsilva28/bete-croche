import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Sobre.css";

function Sobre() {

    return (

        <>

            <Navbar />

            {/* Banner */}

            <section className="bannerSobre">

                <span>Bem-vindo ao nosso universo 🧶</span>

                <h1>Mais do que crochê, criamos histórias.</h1>

                <p>
                    Conheça o lugar onde cada fio ganha vida
                    e cada peça começa a fazer parte de uma nova história.
                </p>

            </section>

            {/* Nossa essência */}

            <section className="secaoSobre">

                <div className="imagemSobre">

                    <img
                        src="public/atelie.jpg"
                        alt="Ateliê"
                    />

                </div>

                <div className="textoSobre">

                    <span>NOSSA ESSÊNCIA</span>

                    <h2>Um cantinho onde criatividade encontra dedicação.</h2>

                    <p>

                        Cada peça começa muito antes da agulha tocar o fio.
                        Tudo nasce da vontade de criar algo especial, útil e cheio
                        de personalidade.

                    </p>

                    <p>

                        O ateliê é um espaço onde cada detalhe importa.
                        Aqui o tempo é respeitado, a criatividade é livre
                        e cada criação recebe atenção do início ao fim.

                    </p>

                </div>

            </section>

            {/* Inspiração */}

            <section className="secaoSobre reverso">

                <div className="textoSobre">

                    <span>INSPIRAÇÃO</span>

                    <h2>As melhores ideias aparecem nos pequenos detalhes.</h2>

                    <p>

                        As coleções surgem através das cores da natureza,
                        da decoração, das estações do ano e principalmente
                        das histórias compartilhadas pelos clientes.

                    </p>

                    <p>

                        Cada encomenda inspira novas combinações de cores,
                        novos pontos e novas possibilidades.

                    </p>

                </div>

                <div className="imagemSobre">

                    <img
                        src="public/inspiracao.jpg"
                        alt="Inspiração"
                    />

                </div>

            </section>

            {/* Bastidores */}

            <section className="bastidores">

                <h2>Conheça um pouco dos bastidores</h2>

                <p>
                    Muito acontece antes de uma peça chegar até você.
                </p>

                <div className="galeria">

                    <div className="itemGaleria">

                        <img
                            src="public/FIOS.jpeg"
                            alt=""
                        />

                        <h3>Escolha dos fios</h3>

                    </div>

                    <div className="itemGaleria">

                        <img
                            src="public/MANUAL.jpg"
                            alt=""
                        />

                        <h3>Produção manual</h3>

                    </div>

                    <div className="itemGaleria">

                        <img
                            src="public/ACABAMENTO.jpg"
                            alt=""
                        />

                        <h3>Acabamento</h3>

                    </div>

                    <div className="itemGaleria">

                        <img
                            src="public/EMBALAGEM.jpeg"
                            alt=""
                        />

                        <h3>Embalagem</h3>

                    </div>

                </div>

            </section>

            {/* Processo */}

            <section className="processo">

                <h2>Da ideia até sua casa</h2>

                <div className="linhaTempo">

                    <div>

                        <span>1</span>

                        <h3>Ideia</h3>

                        <p>
                            Tudo começa com uma inspiração.
                        </p>

                    </div>

                    <div>

                        <span>2</span>

                        <h3>Planejamento</h3>

                        <p>
                            Escolha dos materiais e cores.
                        </p>

                    </div>

                    <div>

                        <span>3</span>

                        <h3>Produção</h3>

                        <p>
                            Cada ponto é feito manualmente.
                        </p>

                    </div>

                    <div>

                        <span>4</span>

                        <h3>Conferência</h3>

                        <p>
                            Revisamos cada detalhe.
                        </p>

                    </div>

                    <div>

                        <span>5</span>

                        <h3>Entrega</h3>

                        <p>
                            Sua peça segue pronta para fazer parte da sua história.
                        </p>

                    </div>

                </div>

            </section>

            {/* Compromisso */}

            <section className="compromisso">

                <div className="textoCompromisso">

                    <span>NOSSO COMPROMISSO</span>

                    <h2>Mais do que entregar produtos.</h2>

                    <p>

                        Queremos entregar experiências, carinho e exclusividade.
                        Cada peça é produzida pensando em fazer parte de momentos
                        importantes da vida de alguém.

                    </p>

                    <button>

                        💬 Conversar pelo WhatsApp

                    </button>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Sobre;