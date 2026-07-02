import { useEffect, useState } from "react";
import api from "../../services/api";
import CardProduto from "../CardProduto/CardProduto";
import "./Destaques.css";
import ModalProduto from "../ModalProduto/ModalProduto";
function Destaques() {

    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    
    
function abrirProduto(produto) {

    setProdutoSelecionado(produto);

    setModalAberto(true);

}

function fecharProduto() {

    setModalAberto(false);

    setProdutoSelecionado(null);

}
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
                    abrirProduto={abrirProduto}/>

                ))}

            </div>
            <ModalProduto
          aberto={modalAberto}          
           produto={produtoSelecionado}          
           fechar={fecharProduto}/>

        </section>

    );

}

export default Destaques;