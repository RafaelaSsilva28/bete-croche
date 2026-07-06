import "./CategoriasAdmin.css";

import { useEffect, useState } from "react";

import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import ModalCategoriaAdmin from "../../components/ModalCategoriaAdmin/ModalCategoriaAdmin";

import api from "../../services/api";

import {
    FaTags,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaCheckCircle,
    FaTimesCircle,
    FaSpinner
} from "react-icons/fa";

function CategoriasAdmin() {

    const [categorias, setCategorias] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    const [modalAberto, setModalAberto] = useState(false);
    const [categoriaEditando, setCategoriaEditando] = useState(null);

    const [carregando, setCarregando] = useState(true);
    const [excluindo, setExcluindo] = useState(null);

    const [toast, setToast] = useState(null);

    useEffect(() => {

        carregarCategorias();

    }, []);

    function mostrarToast(tipo, mensagem) {

        setToast({
            tipo,
            mensagem
        });

        setTimeout(() => {

            setToast(null);

        }, 4000);

    }

    async function carregarCategorias() {

        try {

            setCarregando(true);

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

            mostrarToast(
                "erro",
                erro.response?.data?.message ||
                "Não foi possível carregar as categorias."
            );

        } finally {

            setCarregando(false);

        }

    }

    function abrirNovaCategoria() {

        setCategoriaEditando(null);
        setModalAberto(true);

    }

    async function abrirEditarCategoria(categoria) {

        try {

            const token = localStorage.getItem("token");

            const resposta = await api.get(
                `/categorias/${categoria.id_categoria}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCategoriaEditando(resposta.data);
            setModalAberto(true);

        } catch (erro) {

            console.log(
                "Erro ao buscar categoria:",
                erro.response?.data || erro
            );

            mostrarToast(
                "erro",
                erro.response?.data?.message ||
                "Não foi possível buscar a categoria."
            );

        }

    }

    function fecharModal() {

        setModalAberto(false);
        setCategoriaEditando(null);

    }

    async function excluirCategoria(idCategoria) {

        try {

            setExcluindo(idCategoria);

            const token = localStorage.getItem("token");

            await api.delete(
                `/categorias/${idCategoria}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            await carregarCategorias();

            mostrarToast(
                "sucesso",
                "Categoria desativada com sucesso."
            );

        } catch (erro) {

            console.log(
                "Erro ao desativar categoria:",
                erro.response?.data || erro
            );

            mostrarToast(
                "erro",
                erro.response?.data?.message ||
                "Não foi possível desativar a categoria."
            );

        } finally {

            setExcluindo(null);

        }

    }

    const categoriasFiltradas = categorias.filter(
        (categoria) => {

            const termo = pesquisa
                .trim()
                .toLowerCase();

            const nome = categoria.nome
                ?.toLowerCase() || "";

            const descricao = categoria.descricao
                ?.toLowerCase() || "";

            return (
                nome.includes(termo) ||
                descricao.includes(termo)
            );

        }
    );

    return (

        <div className="adminContainer">

            <NavbarAdmin />

            {toast && (

                <div
                    className={`toastCategoriaAdmin ${toast.tipo}`}
                >

                    {toast.tipo === "sucesso" ? (
                        <FaCheckCircle />
                    ) : (
                        <FaTimesCircle />
                    )}

                    <span>
                        {toast.mensagem}
                    </span>

                </div>

            )}

            <main className="categoriasAdmin">

                <div className="topoCategoriasAdmin">

                    <div>

                        <h1>
                            Categorias
                        </h1>

                        <p>
                            Organize os produtos cadastrando e
                            gerenciando suas categorias.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="btnNovaCategoria"
                        onClick={abrirNovaCategoria}
                    >
                        <FaPlus />

                        Nova Categoria
                    </button>

                </div>

                <div className="barraPesquisaCategoria">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Pesquisar categoria..."
                        value={pesquisa}
                        onChange={(evento) =>
                            setPesquisa(evento.target.value)
                        }
                    />

                </div>

                {carregando ? (

                    <div className="carregandoCategorias">

                        <FaSpinner className="iconeGirando" />

                        <p>
                            Carregando categorias...
                        </p>

                    </div>

                ) : categoriasFiltradas.length === 0 ? (

                    <div className="semCategoriasAdmin">

                        <FaTags />

                        <h3>
                            Nenhuma categoria encontrada
                        </h3>

                        <p>
                            Cadastre uma categoria para organizar
                            os produtos.
                        </p>

                    </div>

                ) : (

                    <section className="gradeCategoriasAdmin">

                        {categoriasFiltradas.map(
                            (categoria) => (

                                <article
                                    className="cardCategoriaAdmin"
                                    key={categoria.id_categoria}
                                >

                                    <div className="iconeCategoriaAdmin">

                                        <FaTags />

                                    </div>

                                    <div className="infoCategoriaAdmin">

                                        <h3>
                                            {categoria.nome}
                                        </h3>

                                        <p>
                                            {categoria.descricao ||
                                                "Categoria sem descrição."}
                                        </p>

                                    </div>

                                    <div className="acoesCategoriaAdmin">

                                        <button
                                            type="button"
                                            className="btnEditarCategoria"
                                            onClick={() =>
                                                abrirEditarCategoria(
                                                    categoria
                                                )
                                            }
                                            title="Editar categoria"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            type="button"
                                            className="btnExcluirCategoria"
                                            onClick={() =>
                                                excluirCategoria(
                                                    categoria.id_categoria
                                                )
                                            }
                                            disabled={
                                                excluindo ===
                                                categoria.id_categoria
                                            }
                                            title="Desativar categoria"
                                        >

                                            {excluindo ===
                                            categoria.id_categoria ? (

                                                <FaSpinner className="iconeGirando" />

                                            ) : (

                                                <FaTrash />

                                            )}

                                        </button>

                                    </div>

                                </article>

                            )
                        )}

                    </section>

                )}

            </main>

            <ModalCategoriaAdmin
                aberto={modalAberto}
                fechar={fecharModal}
                categoria={categoriaEditando}
                atualizarLista={carregarCategorias}
                mostrarToast={mostrarToast}
            />

        </div>

    );

}

export default CategoriasAdmin;