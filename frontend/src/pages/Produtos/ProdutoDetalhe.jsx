import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function ProdutoDetalhe() {

    const { id } = useParams();

    const [produto, setProduto] = useState(null);

    useEffect(() => {

        async function buscarProduto() {

            try {

                const resposta = await api.get(`/produtos/${id}`);

                setProduto(resposta.data);

            } catch (erro) {

                console.log(erro);

            }

        }

        buscarProduto();

    }, [id]);

    if (!produto) {

        return <h2>Carregando produto...</h2>;

    }

    return (

    <div style={{ padding: "40px" }}>

        <img
    src={
        produto.imagens.length > 0
            ? `http://localhost:3001/uploads/${produto.imagens[0].caminho_imagem}`
            : "https://placehold.co/500x500"
    }
    alt={produto.nome}
    style={{
        width: "450px",
        borderRadius: "15px"
    }}
/>

        <h1>{produto.nome}</h1>

        <p>{produto.descricao}</p>

        <h2>R$ {Number(produto.preco).toFixed(2)}</h2>

        <p>
            <strong>Material:</strong> {produto.material}
        </p>

        <p>
            <strong>Categoria:</strong> {produto.categoria.nome}
        </p>

        <p>
            <strong>Sob encomenda:</strong> {produto.sob_encomenda ? "Sim" : "Não"}
        </p>

        <p>
            <strong>Tempo de produção:</strong> {produto.tempo_producao || "Pronta entrega"}
        </p>

    </div>

);
}

export default ProdutoDetalhe;