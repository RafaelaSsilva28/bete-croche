import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const router = Router();

// ASSINATURA DO SERVIDOR
const SECRET_KEY = "sua_chave_secreta";

//--------------------------------------------------------------------------------------------------------
// POST - login

router.post(
    "/login",
    async (req, res) => {

        const { email, senha } = req.body;

        try {

            // Verifica se os campos foram preenchidos
            if (!email || !senha) {
                return res.status(400).json({
                    message: "E-mail e senha são obrigatórios."
                });
            }

            // Procura o usuário
            const usuario = await BD.query(
                `SELECT *
                 FROM usuarios
                 WHERE email = $1
                 AND ativo = TRUE`,
                [email]
            );

            if (usuario.rows.length === 0) {
                return res.status(401).json({
                    message: "E-mail ou senha inválidos."
                });
            }

            const dadosUsuario = usuario.rows[0];

            // Compara a senha digitada com a senha criptografada
            const senhaCorreta = await bcrypt.compare(
                senha,
                dadosUsuario.senha
            );

            if (!senhaCorreta) {
                return res.status(401).json({
                    message: "E-mail ou senha inválidos."
                });
            }

            // Gera o token
            const token = jwt.sign(
                {
                    id_usuario: dadosUsuario.id_usuario,
                    nome: dadosUsuario.nome,
                    email: dadosUsuario.email
                },
                SECRET_KEY,
                {
                    expiresIn: "8h"
                }
            );

           return res.status(200).json({

    message: "Login realizado com sucesso.",

    token,

    usuario:{

        id: dadosUsuario.id_usuario,

        nome: dadosUsuario.nome,

        email: dadosUsuario.email

    }

});

        } catch (error) {

            console.error("Erro ao realizar login:", error.message);

            return res.status(500).json({
                message: "Erro ao realizar login."
            });

        }

    }
);
export default router;