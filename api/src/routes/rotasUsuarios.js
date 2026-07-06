import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from "bcrypt";
import { autenticarToken } from "../middlewares/autenticacao.js";
const router = Router();
//--------------------------------------------------------------------------------------------------------
// POST - cadastrar usuário

router.post(
    "/usuarios",
    async (req, res) => {

        const {
            nome,
            email,
            senha
        } = req.body;

        try {

            // Verifica se todos os campos foram preenchidos
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    message: "Todos os campos são obrigatórios."
                });
            }

            // Verifica se já existe usuário com o mesmo e-mail
            const usuarioExiste = await BD.query(
                `SELECT *
                 FROM usuarios
                 WHERE email = $1`,
                [email]
            );

            if (usuarioExiste.rows.length > 0) {
                return res.status(400).json({
                    message: "E-mail já cadastrado."
                });
            }

            // Criptografa a senha
            const senhaCriptografada = await bcrypt.hash(senha, 10);

            // Cadastra o usuário
            await BD.query(
                `INSERT INTO usuarios
                (
                    nome,
                    email,
                    senha
                )
                VALUES
                ($1,$2,$3)`,
                [
                    nome,
                    email,
                    senhaCriptografada
                ]
            );

            return res.status(201).json({
                message: "Usuário cadastrado com sucesso."
            });

        } catch (error) {

            console.error("Erro ao cadastrar usuário:", error.message);

            return res.status(500).json({
                message: "Erro ao cadastrar usuário."
            });

        }

    }
);
//--------------------------------------------------------------------------------------------------------
// GET - listar usuários

router.get(
    "/usuarios",
    autenticarToken,
    async (req, res) => {

        try {

            const usuarios = await BD.query(
                `SELECT
                    id_usuario,
                    nome,
                    email,
                    ativo
                 FROM usuarios
                 WHERE ativo = TRUE
                 ORDER BY id_usuario ASC`
            );

            return res.status(200).json(usuarios.rows);

        } catch (error) {

            console.error("Erro ao listar usuários:", error.message);

            return res.status(500).json({
                message: "Erro ao listar usuários."
            });

        }

    }
);
//--------------------------------------------------------------------------------------------------------
// GET - buscar usuário por ID

router.get(
    "/usuarios/:id_usuario",
    autenticarToken,
    async (req, res) => {

        const { id_usuario } = req.params;

        try {

            const usuario = await BD.query(
                `SELECT
                    id_usuario,
                    nome,
                    email,
                    ativo
                 FROM usuarios
                 WHERE id_usuario = $1
                 AND ativo = TRUE`,
                [id_usuario]
            );

            if (usuario.rows.length === 0) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                });
            }

            return res.status(200).json(usuario.rows[0]);

        } catch (error) {

            console.error("Erro ao buscar usuário:", error.message);

            return res.status(500).json({
                message: "Erro ao buscar usuário."
            });

        }

    }
);
//--------------------------------------------------------------------------------------------------------
// PATCH - atualizar usuário

router.patch(
    "/usuarios/:id_usuario",
    autenticarToken,
    async (req, res) => {

        const { id_usuario } = req.params;

        const {
            nome,
            email,
            senha_atual,
            nova_senha
        } = req.body;

        try {

            const usuario = await BD.query(
                `
                    SELECT
                        id_usuario,
                        nome,
                        email,
                        senha,
                        ativo
                    FROM usuarios
                    WHERE id_usuario = $1
                    AND ativo = TRUE
                `,
                [id_usuario]
            );

            if (usuario.rows.length === 0) {

                return res.status(404).json({
                    message: "Usuário não encontrado."
                });

            }

            const dadosUsuario = usuario.rows[0];

            if (
                nome !== undefined &&
                (!nome || nome.trim() === "")
            ) {

                return res.status(400).json({
                    message: "O nome não pode ficar vazio."
                });

            }

            if (
                email !== undefined &&
                (!email || email.trim() === "")
            ) {

                return res.status(400).json({
                    message: "O e-mail não pode ficar vazio."
                });

            }

            const novoNome =
                nome !== undefined
                    ? nome.trim()
                    : dadosUsuario.nome;

            const novoEmail =
                email !== undefined
                    ? email.trim().toLowerCase()
                    : dadosUsuario.email;

            if (email !== undefined) {

                const emailExiste = await BD.query(
                    `
                        SELECT id_usuario
                        FROM usuarios
                        WHERE LOWER(email) = LOWER($1)
                        AND id_usuario <> $2
                    `,
                    [novoEmail, id_usuario]
                );

                if (emailExiste.rows.length > 0) {

                    return res.status(400).json({
                        message: "E-mail já cadastrado."
                    });

                }

            }

            let senhaAtualizada = dadosUsuario.senha;

            if (nova_senha !== undefined) {

                if (!senha_atual) {

                    return res.status(400).json({
                        message: "Informe a senha atual."
                    });

                }

                if (
                    !nova_senha ||
                    nova_senha.trim().length < 6
                ) {

                    return res.status(400).json({
                        message: "A nova senha precisa ter pelo menos 6 caracteres."
                    });

                }

                const senhaCorreta = await bcrypt.compare(
                    senha_atual,
                    dadosUsuario.senha
                );

                if (!senhaCorreta) {

                    return res.status(400).json({
                        message: "A senha atual está incorreta."
                    });

                }

                const mesmaSenha = await bcrypt.compare(
                    nova_senha,
                    dadosUsuario.senha
                );

                if (mesmaSenha) {

                    return res.status(400).json({
                        message: "A nova senha deve ser diferente da senha atual."
                    });

                }

                senhaAtualizada = await bcrypt.hash(
                    nova_senha,
                    10
                );

            }

            if (
                nome === undefined &&
                email === undefined &&
                nova_senha === undefined
            ) {

                return res.status(400).json({
                    message: "Nenhum dado foi enviado para atualização."
                });

            }

            const resultado = await BD.query(
                `
                    UPDATE usuarios
                    SET
                        nome = $1,
                        email = $2,
                        senha = $3
                    WHERE id_usuario = $4
                    RETURNING
                        id_usuario,
                        nome,
                        email,
                        ativo
                `,
                [
                    novoNome,
                    novoEmail,
                    senhaAtualizada,
                    id_usuario
                ]
            );

            return res.status(200).json({
                message: nova_senha
                    ? "Dados e senha atualizados com sucesso."
                    : "Dados atualizados com sucesso.",
                usuario: resultado.rows[0]
            });

        } catch (error) {

            console.error(
                "Erro ao atualizar usuário:",
                error.message
            );

            return res.status(500).json({
                message: "Erro ao atualizar usuário."
            });

        }

    }
);
//--------------------------------------------------------------------------------------------------------
// DELETE - desativar usuário

router.delete(
    "/usuarios/:id_usuario",
    autenticarToken,
    async (req, res) => {

        const { id_usuario } = req.params;

        try {

            // Verifica se o usuário existe
            const usuario = await BD.query(
                `SELECT *
                 FROM usuarios
                 WHERE id_usuario = $1
                 AND ativo = TRUE`,
                [id_usuario]
            );

            if (usuario.rows.length === 0) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                });
            }

            // Desativa o usuário
            await BD.query(
                `UPDATE usuarios
                 SET ativo = FALSE
                 WHERE id_usuario = $1`,
                [id_usuario]
            );

            return res.status(200).json({
                message: "Usuário desativado com sucesso."
            });

        } catch (error) {

            console.error("Erro ao desativar usuário:", error.message);

            return res.status(500).json({
                message: "Erro ao desativar usuário."
            });

        }

    }
);
export default router;