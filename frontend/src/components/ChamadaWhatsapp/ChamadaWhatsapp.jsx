import "./ChamadaWhatsapp.css";

function ChamadaWhatsapp() {

    const mensagem = encodeURIComponent(
        "Olá! Vim pelo site da Elizabeth Crochê e gostaria de solicitar um orçamento."
    );

    return (

        <section className="chamadaWhatsapp">

            <h2>
                ✨ Não encontrou o que procura?
            </h2>

            <p>

                Produzimos peças personalizadas especialmente para você.
                Entre em contato e solicite um orçamento sem compromisso.

            </p>

            <a
                href={`https://wa.me/5518997269333?text=${mensagem}`}
                target="_blank"
                rel="noreferrer"
            >

                💬 Solicitar Orçamento

            </a>

        </section>

    );

}

export default ChamadaWhatsapp;