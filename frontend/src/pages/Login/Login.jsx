import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaTimesCircle,
    FaHeart,
    FaShieldAlt,
    FaSpinner
} from "react-icons/fa";

import api from "../../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const [toast, setToast] = useState(null);

    function mostrarToast(tipo, mensagem) {

        setToast({
            tipo,
            mensagem
        });

        setTimeout(() => {
            setToast(null);
        }, 3000);

    }

    async function fazerLogin(evento) {

        evento.preventDefault();

        try {

            setCarregando(true);

            const resposta = await api.post("/login", {
                email: email.trim(),
                senha
            });

            localStorage.setItem(
                "token",
                resposta.data.token
            );

            localStorage.setItem(
                "usuario",
                JSON.stringify(resposta.data.usuario)
            );

            mostrarToast(
                "sucesso",
                "Login realizado com sucesso."
            );

            setTimeout(() => {
                navigate("/admin");
            }, 1000);

        } catch (erro) {

            mostrarToast(
                "erro",
                erro.response?.data?.message ||
                "Não foi possível realizar o login."
            );

        } finally {

            setCarregando(false);

        }

    }

    return (

        <main className="login">

            <div className="decoracaoLogin decoracaoUm"></div>
            <div className="decoracaoLogin decoracaoDois"></div>
            <div className="decoracaoLogin decoracaoTres"></div>

            {toast && (

                <div
                    className={`toastLogin ${toast.tipo}`}
                >

                    {toast.tipo === "sucesso" ? (
                        <FaCheckCircle />
                    ) : (
                        <FaTimesCircle />
                    )}

                    <span>{toast.mensagem}</span>

                </div>

            )}

            <section className="cardLogin">

                <div className="ladoEsquerdoLogin">

                    <div className="circuloDecorativo circuloUm"></div>
                    <div className="circuloDecorativo circuloDois"></div>

                    <div className="conteudoEsquerdoLogin">

                        <div className="iconeMarcaLogin">
                            <FaHeart />
                        </div>

                        <span className="seloLogin">
                            Painel da loja
                        </span>

                        <h1>
                            Elizabeth
                            <span>Crochê</span>
                        </h1>

                        <h3>
                            Artesanato feito com cuidado
                        </h3>

                        <p>
                            Gerencie produtos, categorias, imagens
                            e informações da sua loja em um único lugar.
                        </p>

                        <div className="segurancaLogin">

                            <FaShieldAlt />

                            <span>
                                Área exclusiva da administradora
                            </span>

                        </div>

                    </div>

                </div>

                <div className="ladoDireitoLogin">

                    <div className="cabecalhoLogin">

                        <span className="tituloPequenoLogin">
                            Acesso administrativo
                        </span>

                        <h2>Bem-vinda novamente</h2>

                        <p>
                            Entre com seu e-mail e senha para acessar
                            o painel da loja.
                        </p>

                    </div>

                    <form
                        className="formularioLogin"
                        onSubmit={fazerLogin}
                    >

                        <div className="grupoCampoLogin">

                            <label htmlFor="emailLogin">
                                E-mail
                            </label>

                            <div className="campoLogin">

                                <FaEnvelope />

                                <input
                                    id="emailLogin"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(evento) =>
                                        setEmail(evento.target.value)
                                    }
                                    autoComplete="email"
                                    disabled={carregando}
                                    required
                                />

                            </div>

                        </div>

                        <div className="grupoCampoLogin">

                            <label htmlFor="senhaLogin">
                                Senha
                            </label>

                            <div className="campoLogin">

                                <FaLock />

                                <input
                                    id="senhaLogin"
                                    type={
                                        mostrarSenha
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(evento) =>
                                        setSenha(evento.target.value)
                                    }
                                    autoComplete="current-password"
                                    disabled={carregando}
                                    required
                                />

                                <button
                                    type="button"
                                    className="mostrarSenhaLogin"
                                    onClick={() =>
                                        setMostrarSenha(
                                            (anterior) => !anterior
                                        )
                                    }
                                    aria-label={
                                        mostrarSenha
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                >

                                    {mostrarSenha ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}

                                </button>

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btnEntrarLogin"
                            disabled={carregando}
                        >

                            {carregando ? (

                                <>
                                    <FaSpinner className="iconeGirandoLogin" />
                                    Entrando...
                                </>

                            ) : (

                                <>
                                    <FaShieldAlt />
                                    Entrar no painel
                                </>

                            )}

                        </button>

                    </form>

                    <p className="rodapeLogin">
                        Acesso restrito à administradora da loja.
                    </p>

                </div>

            </section>

        </main>

    );

}

export default Login;