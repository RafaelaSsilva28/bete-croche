import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import api from "../../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [carregando, setCarregando] = useState(false);

    async function fazerLogin(e) {

        e.preventDefault();

        try {

            setCarregando(true);

            const resposta = await api.post("/login", {

                email,
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

            navigate("/admin");

        }

        catch (erro) {

            alert(

                erro.response?.data?.message ||

                "Erro ao realizar login."

            );

        }

        finally {

            setCarregando(false);

        }

    }

    return (

        <div className="login">

            <form
                className="cardLogin"
                onSubmit={fazerLogin}
            >

                <h1>Elizabeth Crochê</h1>

                <h2>Painel Administrativo</h2>

                <p>

                    Faça login para administrar sua loja.

                </p>

                <div className="campo">

                    <FaEnvelope />

                    <input

                        type="email"

                        placeholder="Digite seu e-mail"

                        value={email}

                        onChange={(e) =>

                            setEmail(e.target.value)

                        }

                        required

                    />

                </div>

                <div className="campo">

                    <FaLock />

                    <input

                        type={

                            mostrarSenha

                                ? "text"

                                : "password"

                        }

                        placeholder="Digite sua senha"

                        value={senha}

                        onChange={(e) =>

                            setSenha(e.target.value)

                        }

                        required

                    />

                    <button

                        type="button"

                        className="mostrarSenha"

                        onClick={() =>

                            setMostrarSenha(

                                !mostrarSenha

                            )

                        }

                    >

                        {

                            mostrarSenha

                                ? <FaEyeSlash />

                                : <FaEye />

                        }

                    </button>

                </div>

                <button

                    className="btnEntrar"

                    disabled={carregando}

                >

                    {

                        carregando

                            ? "Entrando..."

                            : "Entrar"

                    }

                </button>

            </form>

        </div>

    );

}

export default Login;