import "./ProdutosAdmin.css";

import { useEffect, useState } from "react";

import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import ModalProdutoAdmin from "../../components/ModalProdutoAdmin/ModalProdutoAdmin";

import api from "../../services/api";

import {
    FaBoxOpen,
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaFilter,
    FaSpinner
} from "react-icons/fa";

function ProdutosAdmin() {

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [pesquisa, setPesquisa] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    const [modalAberto, setModalAberto] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState(null);

    const [carregando, setCarregando] = useState(true);
    const [excluindo, setExcluindo] = useState(null);

    useEffect(() => {

        carregarProdutos();
        carregarCategorias();

    }, []);

    async function carregarProdutos() {

        try {

            setCarregando(true);

            const resposta = await api.get("/produtos");

            setProdutos(resposta.data || []);

        } catch (erro) {

            console.log(
                "Erro ao carregar produtos:",
                erro.response?.data || erro
            );

        } finally {

            setCarregando(false);

        }

    }

    async function carregarCategorias() {

        try {

            const token = localStorage.getItem("token");

            const resposta = await api.get(
                "/categorias",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCategorias(resposta.data || []);

        } catch (erro) {

            console.log(
                "Erro ao carregar categorias:",
                erro.response?.data || erro
            );

        }

    }

    function abrirNovoProduto() {

        setProdutoEditando(null);
        setModalAberto(true);

    }

    async function abrirEditarProduto(produto) {

        try {

            const resposta = await api.get(
                `/produtos/${produto.id_produto}`
            );

            setProdutoEditando(resposta.data);
            setModalAberto(true);

        } catch (erro) {

            console.log(
                "Erro ao buscar produto:",
                erro.response?.data || erro
            );

        }

    }

    function fecharModal() {

        setModalAberto(false);
        setProdutoEditando(null);

    }

    async function excluirProduto(idProduto) {

        try {

            setExcluindo(idProduto);

            const token = localStorage.getItem("token");

            await api.delete(
                `/produtos/${idProduto}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            await carregarProdutos();

        } catch (erro) {

            console.log(
                "Erro ao excluir produto:",
                erro.response?.data || erro
            );

        } finally {

            setExcluindo(null);

        }

    }

    const produtosFiltrados = produtos.filter((produto) => {

        const termoPesquisa = pesquisa
            .trim()
            .toLowerCase();

        const nomeProduto = produto.nome
            ?.toLowerCase() || "";

        const correspondePesquisa =
            nomeProduto.includes(termoPesquisa);

        const correspondeCategoria =
            categoriaSelecionada === "" ||
            Number(produto.id_categoria) ===
            Number(categoriaSelecionada);

        return (
            correspondePesquisa &&
            correspondeCategoria
        );

    });

    return (

        <div className="adminContainer">

            <NavbarAdmin />

            <main className="produtosAdmin">

                <div className="topoProdutosAdmin">

                    <div>

                        <h1>Produtos</h1>

                        <p>
                            Gerencie os produtos exibidos no site.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="btnNovoProduto"
                        onClick={abrirNovoProduto}
                    >
                        <FaPlus />

                        Novo Produto
                    </button>

                </div>

                <div className="barraProdutosAdmin">

                    <div className="campoPesquisaProdutoAdmin">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Pesquisar produto..."
                            value={pesquisa}
                            onChange={(evento) =>
                                setPesquisa(evento.target.value)
                            }
                        />

                    </div>

                    <div className="campoFiltroCategoriaAdmin">

                        <FaFilter />

                        <select
                            value={categoriaSelecionada}
                            onChange={(evento) =>
                                setCategoriaSelecionada(
                                    evento.target.value
                                )
                            }
                        >

                            <option value="">
                                Todas as categorias
                            </option>

                            {categorias.map((categoria) => (

                                <option
                                    key={categoria.id_categoria}
                                    value={categoria.id_categoria}
                                >
                                    {categoria.nome}
                                </option>

                            ))}

                        </select>

                    </div>

                </div>

                {carregando ? (

                    <div className="carregandoProdutosAdmin">

                        <FaSpinner className="iconeGirando" />

                        <p>Carregando produtos...</p>

                    </div>

                ) : produtosFiltrados.length === 0 ? (

                    <div className="semProdutosAdmin">

                        <FaBoxOpen />

                        <h3>
                            Nenhum produto encontrado
                        </h3>

                        <p>
                            Tente pesquisar outro nome ou
                            selecionar outra categoria.
                        </p>

                    </div>

                ) : (

                    <section className="listaProdutosAdmin">

                        {produtosFiltrados.map((produto) => (

                            <article
                                className="cardProdutoAdmin"
                                key={produto.id_produto}
                            >

                                <img
                                    src={
                                        produto.imagem_principal
                                            ? `http://localhost:3001/uploads/${produto.imagem_principal}`
                                            : "https://placehold.co/120x120"
                                    }
                                    alt={produto.nome}
                                />

                                <div className="infoProdutoAdmin">

                                    <h3>
                                        {produto.nome}
                                    </h3>

                                    <p className="categoriaProdutoAdmin">
                                        {produto.categoria}
                                    </p>

                                    <strong>
                                        R${" "}
                                        {Number(
                                            produto.preco
                                        ).toFixed(2)}
                                    </strong>

                                </div>

                                <div className="acoesProdutoAdmin">

                                    <button
                                        type="button"
                                        className="btnEditar"
                                        onClick={() =>
                                            abrirEditarProduto(
                                                produto
                                            )
                                        }
                                        title="Editar produto"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        type="button"
                                        className="btnExcluirProduto"
                                        onClick={() =>
                                            excluirProduto(
                                                produto.id_produto
                                            )
                                        }
                                        disabled={
                                            excluindo ===
                                            produto.id_produto
                                        }
                                        title="Excluir produto"
                                    >

                                        {excluindo ===
                                        produto.id_produto ? (

                                            <FaSpinner className="iconeGirando" />

                                        ) : (

                                            <FaTrash />

                                        )}

                                    </button>

                                </div>

                            </article>

                        ))}

                    </section>

                )}

            </main>

            <ModalProdutoAdmin
                aberto={modalAberto}
                fechar={fecharModal}
                produto={produtoEditando}
                atualizarLista={carregarProdutos}
            />

        </div>

    );

}

export default ProdutosAdmin;