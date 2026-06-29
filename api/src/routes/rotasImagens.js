import { Router } from "express";
import { BD } from "../../db.js";
import upload from "../middlewares/upload.js";
import { autenticarToken } from "../middlewares/autenticacao.js";
import fs from "fs";
import path from "path";

const router = Router();

//--------------------------------------------------------------------------------------------------------
// POST - cadastrar imagens do produto

router.post(
    "/produtos/:produto_id/imagens",
    autenticarToken,
    upload.array("imagens", 10), // permite até 10 imagens
    async (req, res) => {

        const { produto_id } = req.params;

        try {

            // Verifica se o produto existe
            const verificarProduto = await BD.query(
                `SELECT *
                 FROM produtos
                 WHERE id_produto = $1
                 AND ativo = TRUE`,
                [produto_id]
            );

            if (verificarProduto.rows.length === 0) {
                return res.status(404).json({
                    message: "Produto não encontrado."
                });
            }

            // Verifica se enviou alguma imagem
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    message: "Nenhuma imagem foi enviada."
                });
            }

            // Verifica se o produto já possui imagem principal
            const imagemPrincipal = await BD.query(
                `SELECT *
                 FROM imagens_produto
                 WHERE produto_id = $1
                 AND principal = TRUE`,
                [produto_id]
            );

            const possuiPrincipal = imagemPrincipal.rows.length > 0;

            // Salva as imagens
            for (let i = 0; i < req.files.length; i++) {

                const arquivo = req.files[i];

                // Apenas a primeira imagem enviada será principal,
                // caso o produto ainda não possua uma.
                const principal =
                    !possuiPrincipal && i === 0;

                await BD.query(
                    `INSERT INTO imagens_produto
                    (
                        produto_id,
                        caminho_imagem,
                        principal
                    )
                    VALUES
                    ($1,$2,$3)`,
                    [
                        produto_id,
                        arquivo.filename,
                        principal
                    ]
                );

            }

            return res.status(201).json({
                message: "Imagem(ns) cadastrada(s) com sucesso."
            });

        } catch (error) {

            console.error("Erro ao cadastrar imagens:", error.message);

            return res.status(500).json({
                message: "Erro ao cadastrar imagens."
            });

        }

    }
);
//--------------------------------------------------------------------------------------------------------
// GET - listar imagens de um produto

router.get(
    "/produtos/:produto_id/imagens",
    autenticarToken, async (req, res) => {

        const { produto_id } = req.params;

        try {

            const produto = await BD.query(
                `SELECT *
                 FROM produtos
                 WHERE id_produto = $1
                 AND ativo = TRUE`,
                [produto_id]
            );

            if (produto.rows.length === 0) {
                return res.status(404).json({
                    message: "Produto não encontrado."
                });
            }

            const imagens = await BD.query(
                `SELECT
                    id_imagem,
                    caminho_imagem,
                    principal,
                    data_upload
                 FROM imagens_produto
                 WHERE produto_id = $1
                 ORDER BY principal DESC, id_imagem ASC`,
                [produto_id]
            );

            return res.status(200).json(imagens.rows);

        } catch (error) {

            console.error("Erro ao listar imagens:", error.message);

            return res.status(500).json({
                message: "Erro ao listar imagens."
            }
        );

        }

    }
);
//--------------------------------------------------------------------------------------------------------
// PATCH - definir imagem principal

router.patch(
    "/imagens/:id_imagem/principal",
    autenticarToken,
    async (req, res) => {

        const { id_imagem } = req.params;

        try {

            // Verifica se a imagem existe
            const imagem = await BD.query(
                `SELECT *
                 FROM imagens_produto
                 WHERE id_imagem = $1`,
                [id_imagem]
            );

            if (imagem.rows.length === 0) {
                return res.status(404).json({
                    message: "Imagem não encontrada."
                });
            }

            const produto_id = imagem.rows[0].produto_id;

            // Remove a imagem principal atual
            await BD.query(
                `UPDATE imagens_produto
                 SET principal = FALSE
                 WHERE produto_id = $1`,
                [produto_id]
            );

            // Define a nova imagem principal
            await BD.query(
                `UPDATE imagens_produto
                 SET principal = TRUE
                 WHERE id_imagem = $1`,
                [id_imagem]
            );

            return res.status(200).json({
                message: "Imagem principal atualizada com sucesso."
            });

        } catch (error) {

            console.error("Erro ao definir imagem principal:", error.message);

            return res.status(500).json({
                message: "Erro ao atualizar imagem principal."
            });

        }

    }
);
//--------------------------------------------------------------------------------------------------------
// DELETE - excluir imagem

router.delete(
    "/imagens/:id_imagem",
    autenticarToken,
    async (req, res) => {

        const { id_imagem } = req.params;

        try {

            // Verifica se a imagem existe
            const imagem = await BD.query(
                `SELECT *
                 FROM imagens_produto
                 WHERE id_imagem = $1`,
                [id_imagem]
            );

            if (imagem.rows.length === 0) {
                return res.status(404).json({
                    message: "Imagem não encontrada."
                });
            }

            const dadosImagem = imagem.rows[0];

            // Exclui a imagem do banco
            await BD.query(
                `DELETE
                 FROM imagens_produto
                 WHERE id_imagem = $1`,
                [id_imagem]
            );

            // Caminho do arquivo
            const caminhoArquivo = path.join(
                process.cwd(),
                "uploads",
                dadosImagem.caminho_imagem
            );

            // Exclui o arquivo da pasta uploads, caso exista
            if (fs.existsSync(caminhoArquivo)) {
                fs.unlinkSync(caminhoArquivo);
            }

            // Se a imagem excluída era a principal,
            // define outra como principal
            if (dadosImagem.principal) {

                const outraImagem = await BD.query(
                    `SELECT id_imagem
                     FROM imagens_produto
                     WHERE produto_id = $1
                     ORDER BY id_imagem
                     LIMIT 1`,
                    [dadosImagem.produto_id]
                );

                if (outraImagem.rows.length > 0) {

                    await BD.query(
                        `UPDATE imagens_produto
                         SET principal = TRUE
                         WHERE id_imagem = $1`,
                        [outraImagem.rows[0].id_imagem]
                    );

                }

            }

            return res.status(200).json({
                message: "Imagem excluída com sucesso."
            });

        } catch (error) {

            console.error("Erro ao excluir imagem:", error.message);

            return res.status(500).json({
                message: "Erro ao excluir imagem."
            });

        }

    }
);
export default router;