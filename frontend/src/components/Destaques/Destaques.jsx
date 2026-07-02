import { useEffect, useState } from "react";
import api from "../../services/api";
import CardProduto from "../CardProduto/CardProduto";
import "./Destaques.css";

function Destaques() {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {

        async function buscarProdutos() {

            try {

                const resposta = await api.get("/produtos");

                const destaques = resposta.data.filter(
                    produto => produto.destaque === true
                );

                setProdutos(destaques);

            } catch (erro) {

                console.log(erro);

            }

        }

        buscarProdutos();

    }, []);

    return (

        <section className="destaques">

            <h2>Produtos em Destaque</h2>

            <div className="listaProdutos">

                {produtos.map(produto => (

                    <CardProduto
                        key={produto.id_produto}
                        produto={produto}
                    />

                ))}

            </div>

        </section>

    );

}

export default Destaques;