import { useEffect, useState } from "react";
import api from "../../services/api";

import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import CardProduto from "../../components/CardProduto/CardProduto";
import ModalProduto from "../../components/ModalProduto/ModalProduto";
import BotaoCarrinho from "../../components/BotaoCarrinho/BotaoCarrinho";
import ModalCarrinho from "../../components/ModalCarrinho/ModalCarrinho";

import { useCart } from "../../context/CartContext";

import {
    FaShoppingCart,
    FaSearch,
    FaFilter,
    FaBoxOpen
} from "react-icons/fa";

import "./Produtos.css";

function Produtos() {

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    const [pesquisa, setPesquisa] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

    const [carrinhoAberto, setCarrinhoAberto] = useState(false);

    const { carrinho } = useCart();

    const totalItens = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    useEffect(() => {

        async function carregarDados() {

            try {

                const respostaProdutos = await api.get("/produtos");

                setProdutos(respostaProdutos.data);

                const respostaCategorias = await api.get("/categorias");

                setCategorias(respostaCategorias.data);

            } catch (erro) {

                console.log("Erro ao carregar dados:", erro);

            }

        }

        carregarDados();

    }, []);

    async function abrirProduto(produto) {

        try {

            const resposta = await api.get(
                `/produtos/${produto.id_produto}`
            );

            setProdutoSelecionado(resposta.data);
            setModalAberto(true);

        } catch (erro) {

            console.log("Erro ao carregar produto:", erro);

        }

    }

    function fecharProduto() {

        setModalAberto(false);
        setProdutoSelecionado(null);

    }

    const produtosFiltrados = produtos.filter((produto) => {

        const nomeProduto = produto.nome || "";

        const pesquisaOk = nomeProduto
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

                <div>
                    
                </div>

                <h1>Nossos Produtos</h1>

                <p>
                    Descubra peças artesanais feitas com carinho,
                    qualidade e exclusividade.
                </p>

            </section>

            <section className="areaFiltrosProdutos">

                <div className="filtrosProdutos">

                    <div className="campoPesquisaProdutos">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Pesquisar produtos..."
                            value={pesquisa}
                            onChange={(evento) =>
                                setPesquisa(evento.target.value)
                            }
                        />

                    </div>

                    <div className="campoCategoriaProdutos">

                        <FaFilter />

                        <select
                            value={categoriaSelecionada}
                            onChange={(evento) =>
                                setCategoriaSelecionada(
                                    evento.target.value
                                )
                            }
                        >

                            <option value="Todos">
                                Todas as categorias
                            </option>

                            {categorias.map((categoria) => (

                                <option
                                    key={categoria.id_categoria}
                                    value={categoria.nome}
                                >
                                    {categoria.nome}
                                </option>

                            ))}

                        </select>

                    </div>

                    <button
                        type="button"
                        className="resumoCarrinho"
                        onClick={() => setCarrinhoAberto(true)}
                    >

                        <FaShoppingCart />

                        <span>
                            {totalItens}{" "}
                            {totalItens === 1 ? "item" : "itens"} no carrinho
                        </span>

                    </button>

                </div>

            </section>

            <div className="informacoesProdutos">

                <p className="contadorProdutos">

                    <FaBoxOpen />

                    <span>
                        {produtosFiltrados.length}{" "}
                        {produtosFiltrados.length === 1
                            ? "produto encontrado"
                            : "produtos encontrados"}
                    </span>

                </p>

            </div>

            <section className="listaProdutosPagina">

                {produtosFiltrados.length > 0 ? (

                    produtosFiltrados.map((produto) => (

                        <CardProduto
                            key={produto.id_produto}
                            produto={produto}
                            abrirProduto={abrirProduto}
                        />

                    ))

                ) : (

                    <div className="nenhumProdutoEncontrado">

                        <FaSearch />

                        <h3>Nenhum produto encontrado</h3>

                        <p>
                            Tente pesquisar outro nome ou escolher
                            uma categoria diferente.
                        </p>

                    </div>

                )}

            </section>

            <ModalProduto
                aberto={modalAberto}
                produto={produtoSelecionado}
                fechar={fecharProduto}
            />

            <BotaoCarrinho
                abrir={() => setCarrinhoAberto(true)}
            />

            <ModalCarrinho
                aberto={carrinhoAberto}
                fechar={() => setCarrinhoAberto(false)}
            />

            <Footer />

        </>

    );

}

export default Produtos;