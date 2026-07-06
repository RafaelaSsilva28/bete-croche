import { Router } from "express";
import { BD } from "../../db.js";

import upload from "../middlewares/upload.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

import fs from "fs";
import path from "path";

const router = Router();

const LIMITE_IMAGENS = 4;

/*
|--------------------------------------------------------------------------
| Função auxiliar
|--------------------------------------------------------------------------
| Exclui arquivos que o Multer já colocou na pasta uploads quando
| alguma validação falhar.
*/

function excluirArquivosRecebidos(arquivos = []) {

    arquivos.forEach((arquivo) => {

        const caminhoArquivo = path.join(
            process.cwd(),
            "uploads",
            arquivo.filename
        );

        if (fs.existsSync(caminhoArquivo)) {
            fs.unlinkSync(caminhoArquivo);
        }

    });

}

/*
|--------------------------------------------------------------------------
| POST - cadastrar imagens do produto
|--------------------------------------------------------------------------
*/

router.post(
    "/produtos/:produto_id/imagens",
    autenticarToken,
    upload.array("imagens", LIMITE_IMAGENS),
    async (req, res) => {

        const { produto_id } = req.params;

        try {

            const verificarProduto = await BD.query(
                `
                    SELECT id_produto
                    FROM produtos
                    WHERE id_produto = $1
                    AND ativo = TRUE
                `,
                [produto_id]
            );

            if (verificarProduto.rows.length === 0) {

                excluirArquivosRecebidos(req.files);

                return res.status(404).json({
                    message: "Produto não encontrado."
                });

            }

            if (!req.files || req.files.length === 0) {

                return res.status(400).json({
                    message: "Nenhuma imagem foi enviada."
                });

            }

            const quantidadeAtual = await BD.query(
                `
                    SELECT COUNT(*)::INTEGER AS total
                    FROM imagens_produto
                    WHERE produto_id = $1
                `,
                [produto_id]
            );

            const totalAtual = quantidadeAtual.rows[0].total;
            const totalDepoisUpload = totalAtual + req.files.length;

            if (totalDepoisUpload > LIMITE_IMAGENS) {

                excluirArquivosRecebidos(req.files);

                return res.status(400).json({
                    message: `Cada produto pode possuir no máximo ${LIMITE_IMAGENS} imagens.`
                });

            }

            const imagemPrincipal = await BD.query(
                `
                    SELECT id_imagem
                    FROM imagens_produto
                    WHERE produto_id = $1
                    AND principal = TRUE
                    LIMIT 1
                `,
                [produto_id]
            );

            const possuiPrincipal = imagemPrincipal.rows.length > 0;

            await BD.query("BEGIN");

            try {

                for (let i = 0; i < req.files.length; i++) {

                    const arquivo = req.files[i];

                    const principal =
                        !possuiPrincipal &&
                        totalAtual === 0 &&
                        i === 0;

                    await BD.query(
                        `
                            INSERT INTO imagens_produto
                            (
                                produto_id,
                                caminho_imagem,
                                principal
                            )
                            VALUES ($1, $2, $3)
                        `,
                        [
                            produto_id,
                            arquivo.filename,
                            principal
                        ]
                    );

                }

                await BD.query("COMMIT");

            } catch (erroBanco) {

                await BD.query("ROLLBACK");

                excluirArquivosRecebidos(req.files);

                throw erroBanco;

            }

            const imagensAtualizadas = await BD.query(
                `
                    SELECT
                        id_imagem,
                        caminho_imagem,
                        principal
                    FROM imagens_produto
                    WHERE produto_id = $1
                    ORDER BY principal DESC, id_imagem ASC
                `,
                [produto_id]
            );

            return res.status(201).json({
                message: "Imagem(ns) cadastrada(s) com sucesso.",
                imagens: imagensAtualizadas.rows
            });

        } catch (error) {

            console.error(
                "Erro ao cadastrar imagens:",
                error.message
            );

            return res.status(500).json({
                message: "Erro ao cadastrar imagens."
            });

        }

    }
);

/*
|--------------------------------------------------------------------------
| GET - listar imagens de um produto
|--------------------------------------------------------------------------
*/

router.get(
    "/produtos/:produto_id/imagens",
    async (req, res) => {

        const { produto_id } = req.params;

        try {

            const produto = await BD.query(
                `
                    SELECT id_produto
                    FROM produtos
                    WHERE id_produto = $1
                    AND ativo = TRUE
                `,
                [produto_id]
            );

            if (produto.rows.length === 0) {

                return res.status(404).json({
                    message: "Produto não encontrado."
                });

            }

            const imagens = await BD.query(
                `
                    SELECT
                        id_imagem,
                        caminho_imagem,
                        principal
                    FROM imagens_produto
                    WHERE produto_id = $1
                    ORDER BY principal DESC, id_imagem ASC
                `,
                [produto_id]
            );

            return res.status(200).json(imagens.rows);

        } catch (error) {

            console.error(
                "Erro ao listar imagens:",
                error.message
            );

            return res.status(500).json({
                message: "Erro ao listar imagens."
            });

        }

    }
);

/*
|--------------------------------------------------------------------------
| PATCH - definir imagem principal
|--------------------------------------------------------------------------
*/

router.patch(
    "/imagens/:id_imagem/principal",
    autenticarToken,
    async (req, res) => {

        const { id_imagem } = req.params;

        try {

            const imagem = await BD.query(
                `
                    SELECT
                        id_imagem,
                        produto_id,
                        principal
                    FROM imagens_produto
                    WHERE id_imagem = $1
                `,
                [id_imagem]
            );

            if (imagem.rows.length === 0) {

                return res.status(404).json({
                    message: "Imagem não encontrada."
                });

            }

            const dadosImagem = imagem.rows[0];

            if (dadosImagem.principal) {

                return res.status(200).json({
                    message: "Esta imagem já é a capa do produto."
                });

            }

            await BD.query("BEGIN");

            try {

                await BD.query(
                    `
                        UPDATE imagens_produto
                        SET principal = FALSE
                        WHERE produto_id = $1
                    `,
                    [dadosImagem.produto_id]
                );

                await BD.query(
                    `
                        UPDATE imagens_produto
                        SET principal = TRUE
                        WHERE id_imagem = $1
                    `,
                    [id_imagem]
                );

                await BD.query("COMMIT");

            } catch (erroBanco) {

                await BD.query("ROLLBACK");

                throw erroBanco;

            }

            return res.status(200).json({
                message: "Imagem de capa atualizada com sucesso."
            });

        } catch (error) {

            console.error(
                "Erro ao definir imagem principal:",
                error.message
            );

            return res.status(500).json({
                message: "Erro ao atualizar imagem principal."
            });

        }

    }
);

/*
|--------------------------------------------------------------------------
| DELETE - excluir imagem
|--------------------------------------------------------------------------
*/

router.delete(
    "/imagens/:id_imagem",
    autenticarToken,
    async (req, res) => {

        const { id_imagem } = req.params;

        try {

            const imagem = await BD.query(
                `
                    SELECT
                        id_imagem,
                        produto_id,
                        caminho_imagem,
                        principal
                    FROM imagens_produto
                    WHERE id_imagem = $1
                `,
                [id_imagem]
            );

            if (imagem.rows.length === 0) {

                return res.status(404).json({
                    message: "Imagem não encontrada."
                });

            }

            const dadosImagem = imagem.rows[0];

            const quantidadeImagens = await BD.query(
                `
                    SELECT COUNT(*)::INTEGER AS total
                    FROM imagens_produto
                    WHERE produto_id = $1
                `,
                [dadosImagem.produto_id]
            );

            if (quantidadeImagens.rows[0].total === 1) {

                return res.status(400).json({
                    message: "O produto precisa possuir pelo menos uma imagem."
                });

            }

            await BD.query("BEGIN");

            try {

                await BD.query(
                    `
                        DELETE FROM imagens_produto
                        WHERE id_imagem = $1
                    `,
                    [id_imagem]
                );

                if (dadosImagem.principal) {

                    const outraImagem = await BD.query(
                        `
                            SELECT id_imagem
                            FROM imagens_produto
                            WHERE produto_id = $1
                            ORDER BY id_imagem ASC
                            LIMIT 1
                        `,
                        [dadosImagem.produto_id]
                    );

                    await BD.query(
                        `
                            UPDATE imagens_produto
                            SET principal = TRUE
                            WHERE id_imagem = $1
                        `,
                        [outraImagem.rows[0].id_imagem]
                    );

                }

                await BD.query("COMMIT");

            } catch (erroBanco) {

                await BD.query("ROLLBACK");

                throw erroBanco;

            }

            const caminhoArquivo = path.join(
                process.cwd(),
                "uploads",
                dadosImagem.caminho_imagem
            );

            if (fs.existsSync(caminhoArquivo)) {
                fs.unlinkSync(caminhoArquivo);
            }

            return res.status(200).json({
                message: "Imagem excluída com sucesso."
            });

        } catch (error) {

            console.error(
                "Erro ao excluir imagem:",
                error.message
            );

            return res.status(500).json({
                message: "Erro ao excluir imagem."
            });

        }

    }
);

export default router;