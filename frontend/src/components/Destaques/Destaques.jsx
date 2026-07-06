import { useEffect, useState } from "react";

import api from "../../services/api";

import CardProduto from "../CardProduto/CardProduto";
import ModalProduto from "../ModalProduto/ModalProduto";

import {
    FaStar,
    FaBoxOpen,
    FaSearch
} from "react-icons/fa";

import "./Destaques.css";

function Destaques() {

    const [produtos, setProdutos] = useState([]);

    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        async function buscarProdutos() {

            try {

                setCarregando(true);

                const resposta = await api.get("/produtos");

                const produtosDestaque = resposta.data.filter(
                    (produto) => produto.destaque === true
                );

                setProdutos(produtosDestaque);

            } catch (erro) {

                console.log(
                    "Erro ao buscar produtos em destaque:",
                    erro
                );

            } finally {

                setCarregando(false);

            }

        }

        buscarProdutos();

    }, []);

    async function abrirProduto(produto) {

        try {

            const resposta = await api.get(
                `/produtos/${produto.id_produto}`
            );

            setProdutoSelecionado(resposta.data);
            setModalAberto(true);

        } catch (erro) {

            console.log(
                "Erro ao buscar produto:",
                erro
            );

        }

    }

    function fecharProduto() {

        setModalAberto(false);
        setProdutoSelecionado(null);

    }

    return (

        <section className="destaques">

            <div className="conteudoDestaques">

                <div className="cabecalhoDestaques">

                    <div className="seloDestaques">

                        <FaStar />

                        <span>Seleção especial</span>

                    </div>

                    <h2>Produtos em destaque</h2>

                    <p>
                        Conheça algumas das peças especiais escolhidas
                        para você.
                    </p>

                </div>

                {carregando ? (

                    <div className="carregandoDestaques">

                        <div className="spinnerDestaques"></div>

                        <span>
                            Carregando produtos...
                        </span>

                    </div>

                ) : produtos.length > 0 ? (

                    <div className="listaProdutosDestaques">

                        {produtos.map((produto) => (

                            <CardProduto
                                key={produto.id_produto}
                                produto={produto}
                                abrirProduto={abrirProduto}
                            />

                        ))}

                    </div>

                ) : (

                    <div className="semDestaques">

                        <div className="iconeSemDestaques">
                            <FaSearch />
                        </div>

                        <h3>
                            Nenhum produto em destaque
                        </h3>

                        <p>
                            Em breve novas peças especiais aparecerão aqui.
                        </p>

                    </div>

                )}

                {produtos.length > 0 && (

                    <div className="rodapeDestaques">

                        <FaBoxOpen />

                        <span>
                            {produtos.length}{" "}
                            {produtos.length === 1
                                ? "produto selecionado"
                                : "produtos selecionados"}
                        </span>

                    </div>

                )}

            </div>

            <ModalProduto
                aberto={modalAberto}
                produto={produtoSelecionado}
                fechar={fecharProduto}
            />

        </section>

    );

}

export default Destaques;