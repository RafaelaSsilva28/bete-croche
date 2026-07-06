import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";

import {
    FaHeart,
    FaLeaf,
    FaLightbulb,
    FaPalette,
    FaCheckCircle,
    FaBoxOpen,
    FaWhatsapp,
    FaMagic,
    FaClipboardList,
    FaHandsHelping,
    FaSearch,
    FaTruck
} from "react-icons/fa";

import { GiYarn, GiSewingNeedle } from "react-icons/gi";

import "./Sobre.css";

function Sobre() {

    return (

        <>

            <Navbar />

            {/* =========================
                BANNER
            ========================= */}

            <section className="bannerSobre">

                <div className="iconeBannerSobre">
                    <GiYarn />
                </div>

                <span className="subtituloBannerSobre">

                    <FaHeart />

                    Bem-vindo ao nosso universo

                </span>

                <h1>
                    Mais do que crochê, criamos histórias.
                </h1>

                <p>
                    Conheça o lugar onde cada fio ganha vida
                    e cada peça começa a fazer parte de uma nova história.
                </p>

            </section>

            {/* =========================
                NOSSA ESSÊNCIA
            ========================= */}

            <section className="secaoSobre">

                <div className="imagemSobre">

                    <img
                        src="/atelie.jpg"
                        alt="Ateliê de crochê"
                    />

                </div>

                <div className="textoSobre">

                    <div className="tituloPequenoSobre">

                        <FaHeart />

                        <span>Nossa essência</span>

                    </div>

                    <h2>
                        Um cantinho onde criatividade encontra dedicação.
                    </h2>

                    <p>
                        Cada peça começa muito antes da agulha tocar o fio.
                        Tudo nasce da vontade de criar algo especial, útil e
                        cheio de personalidade.
                    </p>

                    <p>
                        O ateliê é um espaço onde cada detalhe importa.
                        Aqui o tempo é respeitado, a criatividade é livre
                        e cada criação recebe atenção do início ao fim.
                    </p>

                    <div className="destaqueSobre">

                        <GiSewingNeedle />

                        <span>
                            Cada ponto é feito manualmente e com cuidado.
                        </span>

                    </div>

                </div>

            </section>

            {/* =========================
                INSPIRAÇÃO
            ========================= */}

            <section className="secaoSobre reverso">

                <div className="textoSobre">

                    <div className="tituloPequenoSobre">

                        <FaLightbulb />

                        <span>Inspiração</span>

                    </div>

                    <h2>
                        As melhores ideias aparecem nos pequenos detalhes.
                    </h2>

                    <p>
                        As coleções surgem através das cores da natureza,
                        da decoração, das estações do ano e principalmente
                        das histórias compartilhadas pelos clientes.
                    </p>

                    <p>
                        Cada encomenda inspira novas combinações de cores,
                        novos pontos e novas possibilidades.
                    </p>

                    <div className="destaqueSobre">

                        <FaPalette />

                        <span>
                            Cores, formas e histórias inspiram cada criação.
                        </span>

                    </div>

                </div>

                <div className="imagemSobre">

                    <img
                        src="/inspiracao.jpg"
                        alt="Inspiração para peças de crochê"
                    />

                </div>

            </section>

            {/* =========================
                BASTIDORES
            ========================= */}

            <section className="bastidores">

                <div className="cabecalhoSecaoSobre">

                    <div className="iconeSecaoSobre">
                        <FaMagic />
                    </div>

                    <h2>
                        Conheça um pouco dos bastidores
                    </h2>

                    <p>
                        Muito acontece antes de uma peça chegar até você.
                    </p>

                </div>

                <div className="galeria">

                    <div className="itemGaleria">

                        <div className="imagemGaleria">

                            <img
                                src="/FIOS.jpeg"
                                alt="Escolha dos fios"
                            />

                            <div className="iconeGaleria">
                                <GiYarn />
                            </div>

                        </div>

                        <h3>Escolha dos fios</h3>

                        <p>
                            Seleção cuidadosa de cores e materiais.
                        </p>

                    </div>

                    <div className="itemGaleria">

                        <div className="imagemGaleria">

                            <img
                                src="/MANUAL.jpg"
                                alt="Produção manual"
                            />

                            <div className="iconeGaleria">
                                <GiSewingNeedle />
                            </div>

                        </div>

                        <h3>Produção manual</h3>

                        <p>
                            Cada ponto é produzido com atenção.
                        </p>

                    </div>

                    <div className="itemGaleria">

                        <div className="imagemGaleria">

                            <img
                                src="/ACABAMENTO.jpg"
                                alt="Acabamento da peça"
                            />

                            <div className="iconeGaleria">
                                <FaCheckCircle />
                            </div>

                        </div>

                        <h3>Acabamento</h3>

                        <p>
                            Todos os detalhes são revisados.
                        </p>

                    </div>

                    <div className="itemGaleria">

                        <div className="imagemGaleria">

                            <img
                                src="/EMBALAGEM.jpeg"
                                alt="Embalagem do produto"
                            />

                            <div className="iconeGaleria">
                                <FaBoxOpen />
                            </div>

                        </div>

                        <h3>Embalagem</h3>

                        <p>
                            Tudo é preparado com cuidado para a entrega.
                        </p>

                    </div>

                </div>

            </section>

            {/* =========================
                PROCESSO
            ========================= */}

            <section className="processo">

                <div className="cabecalhoSecaoSobre">

                    <div className="iconeSecaoSobre">
                        <FaClipboardList />
                    </div>

                    <h2>Da ideia até sua casa</h2>

                    <p>
                        Conheça cada etapa da criação da sua peça.
                    </p>

                </div>

                <div className="linhaTempo">

                    <div className="etapaProcesso">

                        <div className="iconeEtapaProcesso">
                            <FaLightbulb />
                        </div>

                        <span>1</span>

                        <h3>Ideia</h3>

                        <p>
                            Tudo começa com uma inspiração.
                        </p>

                    </div>

                    <div className="etapaProcesso">

                        <div className="iconeEtapaProcesso">
                            <FaPalette />
                        </div>

                        <span>2</span>

                        <h3>Planejamento</h3>

                        <p>
                            Escolha dos materiais e cores.
                        </p>

                    </div>

                    <div className="etapaProcesso">

                        <div className="iconeEtapaProcesso">
                            <GiSewingNeedle />
                        </div>

                        <span>3</span>

                        <h3>Produção</h3>

                        <p>
                            Cada ponto é feito manualmente.
                        </p>

                    </div>

                    <div className="etapaProcesso">

                        <div className="iconeEtapaProcesso">
                            <FaSearch />
                        </div>

                        <span>4</span>

                        <h3>Conferência</h3>

                        <p>
                            Revisamos cada detalhe da peça.
                        </p>

                    </div>

                    <div className="etapaProcesso">

                        <div className="iconeEtapaProcesso">
                            <FaTruck />
                        </div>

                        <span>5</span>

                        <h3>Entrega</h3>

                        <p>
                            Sua peça segue pronta para fazer parte da sua história.
                        </p>

                    </div>

                </div>

            </section>

            {/* =========================
                COMPROMISSO
            ========================= */}

            <section className="compromisso">

                <div className="textoCompromisso">

                    <div className="iconeCompromisso">
                        <FaHandsHelping />
                    </div>

                    <span>NOSSO COMPROMISSO</span>

                    <h2>
                        Mais do que entregar produtos.
                    </h2>

                    <p>
                        Queremos entregar experiências, carinho e exclusividade.
                        Cada peça é produzida pensando em fazer parte de momentos
                        importantes da vida de alguém.
                    </p>

                    <a
                        href="https://wa.me/5518997269333"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="botaoWhatsappSobre"
                    >

                        <FaWhatsapp />

                        Conversar pelo WhatsApp

                    </a>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Sobre;