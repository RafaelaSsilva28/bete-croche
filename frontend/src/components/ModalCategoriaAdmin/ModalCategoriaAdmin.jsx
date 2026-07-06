import "./ModalCategoriaAdmin.css";

import { useEffect, useState } from "react";
import api from "../../services/api";

import {
    FaTimes,
    FaTags,
    FaSave,
    FaSpinner
} from "react-icons/fa";

function ModalCategoriaAdmin({
    aberto,
    fechar,
    categoria,
    atualizarLista,
    mostrarToast
}) {

    const formularioInicial = {
        nome: "",
        descricao: ""
    };

    const [formulario, setFormulario] = useState(formularioInicial);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {

        if (!aberto) return;

        if (categoria) {

            setFormulario({
                nome: categoria.nome || "",
                descricao: categoria.descricao || ""
            });

        } else {

            setFormulario(formularioInicial);

        }

    }, [aberto, categoria]);

    function alterarFormulario(evento) {

        const { name, value } = evento.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value
        }));

    }

    function validarFormulario() {

        if (!formulario.nome.trim()) {

            mostrarToast(
                "erro",
                "Informe o nome da categoria."
            );

            return false;

        }

        return true;

    }

    async function salvarCategoria(evento) {

        evento.preventDefault();

        if (!validarFormulario()) return;

        const token = localStorage.getItem("token");

        if (!token) {

            mostrarToast(
                "erro",
                "Sua sessão expirou. Entre novamente."
            );

            return;

        }

        try {

            setSalvando(true);

            const dadosCategoria = {
                nome: formulario.nome.trim(),
                descricao: formulario.descricao.trim()
            };

            if (categoria) {

                await api.patch(
                    `/categorias/${categoria.id_categoria}`,
                    dadosCategoria,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                mostrarToast(
                    "sucesso",
                    "Categoria atualizada com sucesso."
                );

            } else {

                await api.post(
                    "/categorias",
                    dadosCategoria,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                mostrarToast(
                    "sucesso",
                    "Categoria cadastrada com sucesso."
                );

            }

            await atualizarLista();

            setTimeout(() => {
                fechar();
            }, 800);

        } catch (erro) {

            mostrarToast(
                "erro",
                erro.response?.data?.message ||
                "Não foi possível salvar a categoria."
            );

        } finally {

            setSalvando(false);

        }

    }

    if (!aberto) return null;

    return (

        <div className="overlayModalCategoriaAdmin">

            <div className="modalCategoriaAdmin">

                <div className="cabecalhoModalCategoriaAdmin">

                    <div className="tituloModalCategoriaAdmin">

                        <div className="iconeTituloCategoriaAdmin">
                            <FaTags />
                        </div>

                        <div>

                            <h2>
                                {categoria
                                    ? "Editar Categoria"
                                    : "Nova Categoria"}
                            </h2>

                            <p>
                                {categoria
                                    ? "Atualize os dados da categoria."
                                    : "Preencha os dados para cadastrar uma categoria."}
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="fecharModalCategoriaAdmin"
                        onClick={fechar}
                        disabled={salvando}
                        aria-label="Fechar modal"
                    >
                        <FaTimes />
                    </button>

                </div>

                <form onSubmit={salvarCategoria}>

                    <div className="conteudoModalCategoriaAdmin">

                        <div className="campoCategoriaAdmin">

                            <label htmlFor="nomeCategoria">
                                Nome da categoria
                            </label>

                            <input
                                id="nomeCategoria"
                                type="text"
                                name="nome"
                                value={formulario.nome}
                                onChange={alterarFormulario}
                                placeholder="Ex: Amigurumi"
                                maxLength="150"
                                disabled={salvando}
                            />

                        </div>

                        <div className="campoCategoriaAdmin">

                            <label htmlFor="descricaoCategoria">
                                Descrição
                            </label>

                            <textarea
                                id="descricaoCategoria"
                                name="descricao"
                                value={formulario.descricao}
                                onChange={alterarFormulario}
                                placeholder="Descreva os tipos de produtos desta categoria..."
                                rows="5"
                                disabled={salvando}
                            />

                        </div>

                    </div>

                    <div className="rodapeModalCategoriaAdmin">

                        <button
                            type="button"
                            className="btnCancelarCategoria"
                            onClick={fechar}
                            disabled={salvando}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btnSalvarCategoria"
                            disabled={salvando}
                        >
                            {salvando ? (
                                <>
                                    <FaSpinner className="iconeGirando" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <FaSave />
                                    {categoria
                                        ? "Salvar Alterações"
                                        : "Cadastrar Categoria"}
                                </>
                            )}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ModalCategoriaAdmin;