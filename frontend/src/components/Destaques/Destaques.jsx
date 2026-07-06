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

    const [grupoAtual, setGrupoAtual] = useState(0);
    const [quantidadeVisivel, setQuantidadeVisivel] = useState(3);

    useEffect(() => {

        function atualizarQuantidadeVisivel() {

            const larguraTela = window.innerWidth;

            if (larguraTela <= 600) {

                setQuantidadeVisivel(1);

            } else if (larguraTela <= 950) {

                setQuantidadeVisivel(2);

            } else {

                setQuantidadeVisivel(3);

            }

        }

        atualizarQuantidadeVisivel();

        window.addEventListener(
            "resize",
            atualizarQuantidadeVisivel
        );

        return () => {

            window.removeEventListener(
                "resize",
                atualizarQuantidadeVisivel
            );

        };

    }, []);

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

    const quantidadeGrupos = Math.ceil(
        produtos.length / quantidadeVisivel
    );

    useEffect(() => {

        setGrupoAtual(0);

    }, [quantidadeVisivel]);

    useEffect(() => {

        if (
            produtos.length <= quantidadeVisivel ||
            modalAberto
        ) {
            return;
        }

        const intervalo = setInterval(() => {

            setGrupoAtual((grupoAnterior) => {

                const proximoGrupo = grupoAnterior + 1;

                if (proximoGrupo >= quantidadeGrupos) {
                    return 0;
                }

                return proximoGrupo;

            });

        }, 5000);

        return () => {

            clearInterval(intervalo);

        };

    }, [
        produtos.length,
        quantidadeVisivel,
        quantidadeGrupos,
        modalAberto
    ]);

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

    function selecionarGrupo(indiceGrupo) {

        setGrupoAtual(indiceGrupo);

    }

    function montarProdutosVisiveis() {

        if (produtos.length === 0) {
            return [];
        }

        const quantidadeReal = Math.min(
            quantidadeVisivel,
            produtos.length
        );

        const inicioGrupo =
            grupoAtual * quantidadeVisivel;

        return Array.from(
            { length: quantidadeReal },
            (_, indice) => {

                const posicao =
                    (inicioGrupo + indice) %
                    produtos.length;

                return produtos[posicao];

            }
        );

    }

    const produtosVisiveis =
        montarProdutosVisiveis();

    return (

        <section className="destaques">

            <div className="conteudoDestaques">

                <div className="cabecalhoDestaques">

                    <div className="seloDestaques">

                        <FaStar />

                        <span>
                            Seleção especial
                        </span>

                    </div>

                    <h2>
                        Produtos em destaque
                    </h2>

                    <p>
                        Conheça algumas das peças especiais
                        escolhidas para você.
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

                    <div className="carrosselDestaques">

                        <div
                            className={`
                                listaProdutosDestaques
                                quantidade-${produtosVisiveis.length}
                            `}
                            key={`${grupoAtual}-${quantidadeVisivel}`}
                        >

                            {produtosVisiveis.map(
                                (produto, indice) => (

                                    <div
                                        className="itemDestaque"
                                        key={
                                            `${produto.id_produto}-${grupoAtual}-${indice}`
                                        }
                                    >

                                        <CardProduto
                                            produto={produto}
                                            abrirProduto={abrirProduto}
                                        />

                                    </div>

                                )
                            )}

                        </div>

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
                            Em breve novas peças especiais
                            aparecerão aqui.
                        </p>

                    </div>

                )}

                {quantidadeGrupos > 1 && (

                    <div className="indicadoresDestaques">

                        {Array.from({
                            length: quantidadeGrupos
                        }).map((item, indice) => (

                            <button
                                type="button"
                                key={indice}
                                className={
                                    grupoAtual === indice
                                        ? "indicadorDestaque ativo"
                                        : "indicadorDestaque"
                                }
                                onClick={() =>
                                    selecionarGrupo(indice)
                                }
                                aria-label={
                                    `Mostrar produtos ${indice + 1}`
                                }
                            ></button>

                        ))}

                    </div>

                )}

                {produtos.length > 0 && (

                    <div className="rodapeDestaques">

                        <FaBoxOpen />

                        <span>

                            {produtos.length}{" "}

                            {produtos.length === 1
                                ? "produto em destaque"
                                : "produtos em destaque"}

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