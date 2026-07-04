import { useEffect, useState } from "react";
import api from "../../services/api";

import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import CardProduto from "../../components/CardProduto/CardProduto";
import ModalProduto from "../../components/ModalProduto/ModalProduto";

import "./Produtos.css";

function Produtos() {

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    const [pesquisa, setPesquisa] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

    useEffect(() => {

        async function carregarDados() {

            try {

                const respostaProdutos = await api.get("/produtos");
                setProdutos(respostaProdutos.data);

                const respostaCategorias = await api.get("/categorias");
                setCategorias(respostaCategorias.data);

            } catch (erro) {

                console.log(erro);

            }

        }

        carregarDados();

    }, []);

    // ==========================
    // Buscar o produto completo
    // ==========================
    async function abrirProduto(produto) {

        try {

            const resposta = await api.get(`/produtos/${produto.id_produto}`);

            console.log(resposta.data);

            setProdutoSelecionado(resposta.data);
            setModalAberto(true);

        } catch (erro) {

            console.log("Erro ao buscar produto:", erro);

        }

    }

    function fecharProduto() {

        setModalAberto(false);
        setProdutoSelecionado(null);

    }

    const produtosFiltrados = produtos.filter((produto) => {

        const pesquisaOk = produto.nome
            .toLowerCase()
            .includes(pesquisa.toLowerCase());

        const nomeCategoria =
            typeof produto.categoria === "string"
                ? produto.categoria
                : produto.categoria?.nome;

        const categoriaOk =
            categoriaSelecionada === "Todos" ||
            nomeCategoria === categoriaSelecionada;

        return pesquisaOk && categoriaOk;

    });

    return (

        <>

            <Navbar />

            <section className="bannerProdutos">

                <h1>Nossos Produtos</h1>

                <p>
                    Descubra peças artesanais feitas com carinho,
                    qualidade e exclusividade.
                </p>

            </section>

            <section className="pesquisaProdutos">

                <input
                    type="text"
                    placeholder="🔍 Pesquisar produtos..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />

            </section>

            <section className="categorias">

                <button
                    className={
                        categoriaSelecionada === "Todos"
                            ? "ativo"
                            : ""
                    }
                    onClick={() => setCategoriaSelecionada("Todos")}
                >
                    Todos
                </button>

                {categorias.map((categoria) => (

                    <button
                        key={categoria.id_categoria}
                        className={
                            categoriaSelecionada === categoria.nome
                                ? "ativo"
                                : ""
                        }
                        onClick={() => setCategoriaSelecionada(categoria.nome)}
                    >
                        {categoria.nome}
                    </button>

                ))}

            </section>

            <p className="contadorProdutos">

                {produtosFiltrados.length} produto(s) encontrado(s)

            </p>

            <section className="listaProdutosPagina">

                {produtosFiltrados.map((produto) => (

                    <CardProduto
                        key={produto.id_produto}
                        produto={produto}
                        abrirProduto={abrirProduto}
                    />

                ))}

            </section>

            <ModalProduto
                aberto={modalAberto}
                produto={produtoSelecionado}
                fechar={fecharProduto}
            />

            <Footer />

        </>

    );

}

export default Produtos;