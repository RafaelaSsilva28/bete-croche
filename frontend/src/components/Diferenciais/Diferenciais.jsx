import "./Diferenciais.css";

import {
    FaHeart,
    FaLeaf,
    FaGift,
    FaStar,
    FaCheckCircle
} from "react-icons/fa";

function Diferenciais() {

    const diferenciais = [
        {
            icone: <FaHeart />,
            titulo: "Feito com amor",
            descricao:
                "Cada detalhe é produzido manualmente com cuidado, carinho e dedicação."
        },
        {
            icone: <FaLeaf />,
            titulo: "Materiais premium",
            descricao:
                "Selecionamos fios de excelente qualidade para garantir beleza e durabilidade."
        },
        {
            icone: <FaGift />,
            titulo: "Personalização",
            descricao:
                "Criamos peças exclusivas de acordo com suas ideias, cores e preferências."
        },
        {
            icone: <FaStar />,
            titulo: "Atendimento humanizado",
            descricao:
                "Você recebe atenção próxima, orientação e suporte durante todo o pedido."
        }
    ];

    return (

        <section className="diferenciais">

            <div className="conteudoDiferenciais">

                <div className="cabecalhoDiferenciais">

                    <div className="seloDiferenciais">

                        <FaCheckCircle />

                        <span>Nossos diferenciais</span>

                    </div>

                    <h2>
                        Por que escolher a Elizabeth Crochê?
                    </h2>

                    <p>
                        Cada peça é criada pensando em oferecer qualidade,
                        beleza, cuidado e exclusividade para nossos clientes.
                    </p>

                </div>

                <div className="cardsDiferenciais">

                    {diferenciais.map((item, indice) => (

                        <article
                            className="cardDiferencial"
                            key={indice}
                        >

                            <div className="numeroDiferencial">
                                {String(indice + 1).padStart(2, "0")}
                            </div>

                            <div className="iconeDiferencial">
                                {item.icone}
                            </div>

                            <h3>{item.titulo}</h3>

                            <p>{item.descricao}</p>

                            <div className="linhaDiferencial"></div>

                        </article>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Diferenciais;