import "./Dashboard.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import api from "../../services/api";

import {
    FaBoxOpen,
    FaFolderOpen,
    FaImages,
    FaWhatsapp,
    FaPlus,
    FaEdit
} from "react-icons/fa";

function Dashboard() {

    const navigate = useNavigate();

    const [nomeUsuario, setNomeUsuario] = useState("");

    const [dashboard, setDashboard] = useState({
        produtos: 0,
        produtosAtivos: 0,
        categorias: 0,
        categoriasAtivas: 0,
        imagens: 0,
        ultimosProdutos: []
    });

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        carregarNomeUsuario();
        carregarDashboard();

    }, []);

    function carregarNomeUsuario() {

        try {

            const usuarioSalvo = localStorage.getItem("usuario");

            if (!usuarioSalvo) {

                setNomeUsuario("Administradora");
                return;

            }

            const usuario = JSON.parse(usuarioSalvo);

            setNomeUsuario(
                usuario.nome || "Administradora"
            );

        } catch (erro) {

            console.log(
                "Erro ao carregar usuário:",
                erro
            );

            setNomeUsuario("Administradora");

        }

    }

    async function carregarDashboard() {

        try {

            setCarregando(true);

            const token = localStorage.getItem("token");

            const resposta = await api.get("/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setDashboard(resposta.data);

        } catch (erro) {

            console.log(
                "Erro ao carregar dashboard:",
                erro
            );

        } finally {

            setCarregando(false);

        }

    }

    function abrirWhatsapp() {

        window.open(
            "https://web.whatsapp.com/",
            "_blank",
            "noopener,noreferrer"
        );

    }

    function irParaProdutos() {

        navigate("/admin/produtos");

    }

    function irParaCategorias() {

        navigate("/admin/categorias");

    }

    return (

        <div className="adminContainer">

            <NavbarAdmin />

            <main className="dashboard">

                <div className="boasVindas">

                    <h1>
                        Bem-vinda, {nomeUsuario}
                    </h1>

                    <p>
                        Gerencie produtos, categorias e imagens
                        da sua loja.
                    </p>

                </div>

                <section className="dashboardGrid">

                    <div className="cards">

                        <div className="card">

                            <FaBoxOpen className="icone" />

                            <h3>Produtos</h3>

                            <h2>
                                {carregando
                                    ? "..."
                                    : dashboard.produtosAtivos}
                            </h2>

                            <p>
                                Produtos ativos no site
                            </p>

                        </div>

                        <div className="card">

                            <FaFolderOpen className="icone" />

                            <h3>Categorias</h3>

                            <h2>
                                {carregando
                                    ? "..."
                                    : dashboard.categoriasAtivas}
                            </h2>

                            <p>
                                Categorias ativas
                            </p>

                        </div>

                        <div className="card">

                            <FaImages className="icone" />

                            <h3>Imagens</h3>

                            <h2>
                                {carregando
                                    ? "..."
                                    : dashboard.imagens}
                            </h2>

                            <p>
                                Todas as imagens cadastradas
                            </p>

                        </div>

                    </div>

                    <aside className="produtosRecentes">

                        <div className="topoRecentes">

                            <h2>Produtos Recentes</h2>

                        </div>

                        {carregando ? (

                            <p className="semProdutos">
                                Carregando produtos...
                            </p>

                        ) : dashboard.ultimosProdutos.length === 0 ? (

                            <p className="semProdutos">
                                Nenhum produto cadastrado.
                            </p>

                        ) : (

                            dashboard.ultimosProdutos.map(
                                (produto) => (

                                    <div
                                        className="produtoRecente"
                                        key={produto.id_produto}
                                    >

                                        <img
                                            src={
                                                produto.imagem_principal
                                                    ? `http://localhost:3001/uploads/${produto.imagem_principal}`
                                                    : "https://placehold.co/80x80"
                                            }
                                            alt={produto.nome}
                                        />

                                        <div className="infoProdutoRecente">

                                            <h4>
                                                {produto.nome}
                                            </h4>

                                            <span>
                                                R${" "}
                                                {Number(
                                                    produto.preco
                                                ).toFixed(2)}
                                            </span>

                                        </div>

                                        <button
                                            type="button"
                                            className="btnEditarRecente"
                                            title="Ir para produtos"
                                            onClick={irParaProdutos}
                                        >
                                            <FaEdit />
                                        </button>

                                    </div>

                                )
                            )

                        )}

                    </aside>

                </section>

                <section className="acoes">

                    <h2>Ações rápidas</h2>

                    <div className="botoes">

                        <button
                            type="button"
                            onClick={irParaProdutos}
                        >
                            <FaPlus />
                            Novo Produto
                        </button>

                        <button
                            type="button"
                            onClick={irParaCategorias}
                        >
                            <FaFolderOpen />
                            Nova Categoria
                        </button>

                        <button
                            type="button"
                            onClick={abrirWhatsapp}
                        >
                            <FaWhatsapp />
                            Abrir WhatsApp
                        </button>

                    </div>

                </section>

            </main>

        </div>

    );

}

export default Dashboard;