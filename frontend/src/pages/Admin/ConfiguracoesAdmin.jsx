import "./ConfiguracoesAdmin.css";

import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import api from "../../services/api";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaSave,
    FaShieldAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaSpinner
} from "react-icons/fa";

function ConfiguracoesAdmin() {

    const [dadosConta, setDadosConta] = useState({
        nome: "",
        email: ""
    });

    const [dadosSenha, setDadosSenha] = useState({
        senha_atual: "",
        nova_senha: "",
        confirmar_senha: ""
    });

    const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
    const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    const [carregando, setCarregando] = useState(true);
    const [salvandoConta, setSalvandoConta] = useState(false);
    const [salvandoSenha, setSalvandoSenha] = useState(false);

    const [toast, setToast] = useState(null);

    useEffect(() => {
        carregarUsuario();
    }, []);

    function mostrarToast(tipo, mensagem) {

        setToast({
            tipo,
            mensagem
        });

        setTimeout(() => {
            setToast(null);
        }, 3000);

    }

    function buscarUsuarioLocal() {

        try {

            const usuarioSalvo = localStorage.getItem("usuario");

            if (!usuarioSalvo) {
                return null;
            }

            return JSON.parse(usuarioSalvo);

        } catch (erro) {

            return null;

        }

    }

    async function carregarUsuario() {

        try {

            setCarregando(true);

            const token = localStorage.getItem("token");
            const usuarioLocal = buscarUsuarioLocal();

            const idUsuario =
                usuarioLocal?.id_usuario ||
                usuarioLocal?.id;

            if (!token || !idUsuario) {

                mostrarToast(
                    "erro",
                    "Não foi possível identificar o usuário."
                );

                return;

            }

            const resposta = await api.get(
                `/usuarios/${idUsuario}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDadosConta({
                nome: resposta.data.nome || "",
                email: resposta.data.email || ""
            });

            localStorage.setItem(
                "usuario",
                JSON.stringify(resposta.data)
            );

        } catch (erro) {

            mostrarToast(
                "erro",
                erro.response?.data?.message ||
                "Não foi possível carregar os dados da conta."
            );

        } finally {

            setCarregando(false);

        }

    }

    function alterarDadosConta(evento) {

        const { name, value } = evento.target;

        setDadosConta((anterior) => ({
            ...anterior,
            [name]: value
        }));

    }

    function alterarDadosSenha(evento) {

        const { name, value } = evento.target;

        setDadosSenha((anterior) => ({
            ...anterior,
            [name]: value
        }));

    }

    function validarConta() {

        if (!dadosConta.nome.trim()) {

            mostrarToast(
                "erro",
                "Informe o nome."
            );

            return false;

        }

        if (!dadosConta.email.trim()) {

            mostrarToast(
                "erro",
                "Informe o e-mail."
            );

            return false;

        }

        if (!dadosConta.email.includes("@")) {

            mostrarToast(
                "erro",
                "Informe um e-mail válido."
            );

            return false;

        }

        return true;

    }

    function validarSenha() {

        if (!dadosSenha.senha_atual) {

            mostrarToast(
                "erro",
                "Informe a senha atual."
            );

            return false;

        }

        if (!dadosSenha.nova_senha) {

            mostrarToast(
                "erro",
                "Informe a nova senha."
            );

            return false;

        }

        if (dadosSenha.nova_senha.length < 6) {

            mostrarToast(
                "erro",
                "A nova senha precisa ter pelo menos 6 caracteres."
            );

            return false;

        }

        if (!dadosSenha.confirmar_senha) {

            mostrarToast(
                "erro",
                "Confirme a nova senha."
            );

            return false;

        }

        if (
            dadosSenha.nova_senha !==
            dadosSenha.confirmar_senha
        ) {

            mostrarToast(
                "erro",
                "A confirmação da senha está diferente."
            );

            return false;

        }

        if (
            dadosSenha.senha_atual ===
            dadosSenha.nova_senha
        ) {

            mostrarToast(
                "erro",
                "A nova senha deve ser diferente da senha atual."
            );

            return false;

        }

        return true;

    }

    async function salvarDadosConta(evento) {

        evento.preventDefault();

        if (!validarConta()) return;

        try {

            setSalvandoConta(true);

            const token = localStorage.getItem("token");
            const usuarioLocal = buscarUsuarioLocal();

            const idUsuario =
                usuarioLocal?.id_usuario ||
                usuarioLocal?.id;

            if (!token || !idUsuario) {

                mostrarToast(
                    "erro",
                    "Sua sessão expirou. Entre novamente."
                );

                return;

            }

            const resposta = await api.patch(
                `/usuarios/${idUsuario}`,
                {
                    nome: dadosConta.nome.trim(),
                    email: dadosConta.email.trim()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const usuarioAtualizado =
                resposta.data.usuario;

            if (usuarioAtualizado) {

                localStorage.setItem(
                    "usuario",
                    JSON.stringify(usuarioAtualizado)
                );

                setDadosConta({
                    nome: usuarioAtualizado.nome || "",
                    email: usuarioAtualizado.email || ""
                });

            }

            mostrarToast(
                "sucesso",
                resposta.data.message ||
                "Dados atualizados com sucesso."
            );

        } catch (erro) {

            mostrarToast(
                "erro",
                erro.response?.data?.message ||
                "Não foi possível atualizar os dados."
            );

        } finally {

            setSalvandoConta(false);

        }

    }

    async function alterarSenha(evento) {

        evento.preventDefault();

        if (!validarSenha()) return;

        try {

            setSalvandoSenha(true);

            const token = localStorage.getItem("token");
            const usuarioLocal = buscarUsuarioLocal();

            const idUsuario =
                usuarioLocal?.id_usuario ||
                usuarioLocal?.id;

            if (!token || !idUsuario) {

                mostrarToast(
                    "erro",
                    "Sua sessão expirou. Entre novamente."
                );

                return;

            }

            const resposta = await api.patch(
                `/usuarios/${idUsuario}`,
                {
                    senha_atual: dadosSenha.senha_atual,
                    nova_senha: dadosSenha.nova_senha
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDadosSenha({
                senha_atual: "",
                nova_senha: "",
                confirmar_senha: ""
            });

            setMostrarSenhaAtual(false);
            setMostrarNovaSenha(false);
            setMostrarConfirmacao(false);

            mostrarToast(
                "sucesso",
                resposta.data.message ||
                "Senha alterada com sucesso."
            );

        } catch (erro) {

            mostrarToast(
                "erro",
                erro.response?.data?.message ||
                "Não foi possível alterar a senha."
            );

        } finally {

            setSalvandoSenha(false);

        }

    }

    return (

        <div className="adminContainer">

            <NavbarAdmin />

            {toast && (

                <div
                    className={`toastConfiguracoesAdmin ${toast.tipo}`}
                >

                    {toast.tipo === "sucesso" ? (
                        <FaCheckCircle />
                    ) : (
                        <FaTimesCircle />
                    )}

                    <span>{toast.mensagem}</span>

                </div>

            )}

            <main className="configuracoesAdmin">

                <div className="topoConfiguracoesAdmin">

                    <div>

                        <h1>Configurações</h1>

                        <p>
                            Atualize os dados da conta e altere
                            sua senha de acesso.
                        </p>

                    </div>

                </div>

                {carregando ? (

                    <div className="carregandoConfiguracoes">

                        <FaSpinner className="iconeGirando" />

                        <p>Carregando configurações...</p>

                    </div>

                ) : (

                    <section className="gradeConfiguracoesAdmin">

                        <form
                            className="cardConfiguracaoAdmin"
                            onSubmit={salvarDadosConta}
                        >

                            <div className="tituloCardConfiguracao">

                                <div className="iconeCardConfiguracao">
                                    <FaUser />
                                </div>

                                <div>

                                    <h2>Dados da conta</h2>

                                    <p>
                                        Altere o nome e o e-mail
                                        da administradora.
                                    </p>

                                </div>

                            </div>

                            <div className="campoConfiguracaoAdmin">

                                <label htmlFor="nomeConfiguracao">
                                    Nome
                                </label>

                                <div className="inputConfiguracaoAdmin">

                                    <FaUser />

                                    <input
                                        id="nomeConfiguracao"
                                        type="text"
                                        name="nome"
                                        value={dadosConta.nome}
                                        onChange={alterarDadosConta}
                                        placeholder="Nome da administradora"
                                        disabled={salvandoConta}
                                    />

                                </div>

                            </div>

                            <div className="campoConfiguracaoAdmin">

                                <label htmlFor="emailConfiguracao">
                                    E-mail
                                </label>

                                <div className="inputConfiguracaoAdmin">

                                    <FaEnvelope />

                                    <input
                                        id="emailConfiguracao"
                                        type="email"
                                        name="email"
                                        value={dadosConta.email}
                                        onChange={alterarDadosConta}
                                        placeholder="E-mail de acesso"
                                        disabled={salvandoConta}
                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btnSalvarConfiguracao"
                                disabled={salvandoConta}
                            >

                                {salvandoConta ? (
                                    <>
                                        <FaSpinner className="iconeGirando" />
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <FaSave />
                                        Salvar alterações
                                    </>
                                )}

                            </button>

                        </form>

                        <form
                            className="cardConfiguracaoAdmin"
                            onSubmit={alterarSenha}
                        >

                            <div className="tituloCardConfiguracao">

                                <div className="iconeCardConfiguracao">
                                    <FaShieldAlt />
                                </div>

                                <div>

                                    <h2>Segurança</h2>

                                    <p>
                                        Informe sua senha atual antes
                                        de cadastrar uma nova.
                                    </p>

                                </div>

                            </div>

                            <div className="campoConfiguracaoAdmin">

                                <label htmlFor="senhaAtual">
                                    Senha atual
                                </label>

                                <div className="inputConfiguracaoAdmin">

                                    <FaLock />

                                    <input
                                        id="senhaAtual"
                                        type={
                                            mostrarSenhaAtual
                                                ? "text"
                                                : "password"
                                        }
                                        name="senha_atual"
                                        value={dadosSenha.senha_atual}
                                        onChange={alterarDadosSenha}
                                        placeholder="Digite sua senha atual"
                                        disabled={salvandoSenha}
                                    />

                                    <button
                                        type="button"
                                        className="btnMostrarSenhaConfiguracao"
                                        onClick={() =>
                                            setMostrarSenhaAtual(
                                                (anterior) => !anterior
                                            )
                                        }
                                        aria-label="Mostrar ou esconder senha atual"
                                    >
                                        {mostrarSenhaAtual ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>

                                </div>

                            </div>

                            <div className="campoConfiguracaoAdmin">

                                <label htmlFor="novaSenha">
                                    Nova senha
                                </label>

                                <div className="inputConfiguracaoAdmin">

                                    <FaLock />

                                    <input
                                        id="novaSenha"
                                        type={
                                            mostrarNovaSenha
                                                ? "text"
                                                : "password"
                                        }
                                        name="nova_senha"
                                        value={dadosSenha.nova_senha}
                                        onChange={alterarDadosSenha}
                                        placeholder="Mínimo de 6 caracteres"
                                        disabled={salvandoSenha}
                                    />

                                    <button
                                        type="button"
                                        className="btnMostrarSenhaConfiguracao"
                                        onClick={() =>
                                            setMostrarNovaSenha(
                                                (anterior) => !anterior
                                            )
                                        }
                                        aria-label="Mostrar ou esconder nova senha"
                                    >
                                        {mostrarNovaSenha ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>

                                </div>

                            </div>

                            <div className="campoConfiguracaoAdmin">

                                <label htmlFor="confirmarSenha">
                                    Confirmar nova senha
                                </label>

                                <div className="inputConfiguracaoAdmin">

                                    <FaLock />

                                    <input
                                        id="confirmarSenha"
                                        type={
                                            mostrarConfirmacao
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmar_senha"
                                        value={dadosSenha.confirmar_senha}
                                        onChange={alterarDadosSenha}
                                        placeholder="Repita a nova senha"
                                        disabled={salvandoSenha}
                                    />

                                    <button
                                        type="button"
                                        className="btnMostrarSenhaConfiguracao"
                                        onClick={() =>
                                            setMostrarConfirmacao(
                                                (anterior) => !anterior
                                            )
                                        }
                                        aria-label="Mostrar ou esconder confirmação da senha"
                                    >
                                        {mostrarConfirmacao ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btnSalvarConfiguracao"
                                disabled={salvandoSenha}
                            >

                                {salvandoSenha ? (
                                    <>
                                        <FaSpinner className="iconeGirando" />
                                        Alterando...
                                    </>
                                ) : (
                                    <>
                                        <FaShieldAlt />
                                        Alterar senha
                                    </>
                                )}

                            </button>

                        </form>

                    </section>

                )}

            </main>

        </div>

    );

}

export default ConfiguracoesAdmin;