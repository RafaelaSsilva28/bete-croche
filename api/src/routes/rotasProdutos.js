import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

//--------------------------------------------------------------------------------------------------------
// POST - cadastrar produto

router.post(
    "/produtos",
    autenticarToken,
    async (req, res) => {

        const {
            nome,
            descricao,
            preco,
            estoque = 0,
            sob_encomenda = true,
            tempo_producao,
            material,
            categoria_id,
            destaque = false
        } = req.body;

        // Validação do nome
        if (!nome || nome.trim() === "") {

            return res.status(400).json({
                message: "O nome do produto é obrigatório."
            });

        }

        // Validação do preço
        if (
            preco === undefined ||
            preco === null ||
            preco === ""
        ) {

            return res.status(400).json({
                message: "O preço é obrigatório."
            });

        }

        if (Number(preco) < 0) {

            return res.status(400).json({
                message: "O preço não pode ser negativo."
            });

        }

        // Validação do estoque
        if (Number(estoque) < 0) {

            return res.status(400).json({
                message: "O estoque não pode ser negativo."
            });

        }

        // Validação da categoria
        if (!categoria_id) {

            return res.status(400).json({
                message: "A categoria é obrigatória."
            });

        }

        // Se for sob encomenda, o tempo de produção é obrigatório
        if (
            sob_encomenda === true &&
            (
                !tempo_producao ||
                tempo_producao.trim() === ""
            )
        ) {

            return res.status(400).json({
                message: "Informe o tempo de produção para produtos sob encomenda."
            });

        }

        try {

            // Verifica se a categoria existe e está ativa
            const verificarCategoria = await BD.query(
                `
                    SELECT id_categoria
                    FROM categorias
                    WHERE id_categoria = $1
                    AND ativo = TRUE
                `,
                [categoria_id]
            );

            if (verificarCategoria.rows.length === 0) {

                return res.status(404).json({
                    message: "Categoria não encontrada."
                });

            }

            const comando = `
                INSERT INTO produtos
                (
                    nome,
                    descricao,
                    preco,
                    estoque,
                    sob_encomenda,
                    tempo_producao,
                    material,
                    categoria_id,
                    destaque
                )
                VALUES
                ($1,$2,$3,$4,$5,$6,$7,$8,$9)
                RETURNING id_produto
            `;

            const valores = [
                nome.trim(),
                descricao,
                preco,
                estoque,
                sob_encomenda,
                sob_encomenda ? tempo_producao : null,
                material,
                categoria_id,
                destaque
            ];

            const resultado = await BD.query(
                comando,
                valores
            );

            return res.status(201).json({
                message: "Produto cadastrado com sucesso.",
                id_produto: resultado.rows[0].id_produto
            });

        } catch (error) {

            console.error(
                "Erro ao cadastrar produto:",
                error.message
            );

            return res.status(500).json({
                message: "Erro interno no servidor."
            });

        }

    }
);

//--------------------------------------------------------------------------------------------------------
// GET - listar produtos

router.get(
    "/produtos",
    async (req, res) => {

        try {

            const query = `
                SELECT
                    p.id_produto,
                    p.nome,
                    p.descricao,
                    p.preco,
                    p.estoque,
                    p.sob_encomenda,
                    p.tempo_producao,
                    p.material,
                    p.destaque,

                    c.id_categoria,
                    c.nome AS categoria,

                    i.caminho_imagem AS imagem_principal

                FROM produtos p

                INNER JOIN categorias c
                    ON p.categoria_id = c.id_categoria

                LEFT JOIN imagens_produto i
                    ON p.id_produto = i.produto_id
                    AND i.principal = TRUE

                WHERE
                    p.ativo = TRUE
                    AND c.ativo = TRUE

                ORDER BY
                    p.id_produto DESC
            `;

            const produtos = await BD.query(query);

            return res.status(200).json(
                produtos.rows
            );

        } catch (error) {

            console.error(
                "Erro ao listar produtos:",
                error.message
            );

            return res.status(500).json({
                message: "Erro ao listar produtos."
            });

        }

    }
);

//--------------------------------------------------------------------------------------------------------
// GET - buscar produto por ID

router.get(
    "/produtos/:id_produto",
    async (req, res) => {

        const { id_produto } = req.params;

        try {

            const query = `
                SELECT
                    p.id_produto,
                    p.nome,
                    p.descricao,
                    p.preco,
                    p.estoque,
                    p.sob_encomenda,
                    p.tempo_producao,
                    p.material,
                    p.destaque,

                    c.id_categoria,
                    c.nome AS categoria,

                    i.id_imagem,
                    i.caminho_imagem,
                    i.principal

                FROM produtos p

                INNER JOIN categorias c
                    ON p.categoria_id = c.id_categoria

                LEFT JOIN imagens_produto i
                    ON p.id_produto = i.produto_id

                WHERE
                    p.id_produto = $1
                    AND p.ativo = TRUE
                    AND c.ativo = TRUE

                ORDER BY
                    i.principal DESC,
                    i.id_imagem ASC
            `;

            const resultado = await BD.query(
                query,
                [id_produto]
            );

            if (resultado.rows.length === 0) {

                return res.status(404).json({
                    message: "Produto não encontrado."
                });

            }

            const primeiro = resultado.rows[0];

            const produto = {

                id_produto: primeiro.id_produto,
                nome: primeiro.nome,
                descricao: primeiro.descricao,
                preco: primeiro.preco,
                estoque: primeiro.estoque,
                sob_encomenda: primeiro.sob_encomenda,
                tempo_producao: primeiro.tempo_producao,
                material: primeiro.material,
                destaque: primeiro.destaque,

                categoria: {
                    id_categoria: primeiro.id_categoria,
                    nome: primeiro.categoria
                },

                imagens: []

            };

            resultado.rows.forEach((imagem) => {

                if (imagem.id_imagem) {

                    produto.imagens.push({

                        id_imagem: imagem.id_imagem,
                        caminho_imagem:
                            imagem.caminho_imagem,
                        principal: imagem.principal

                    });

                }

            });

            return res.status(200).json(produto);

        } catch (error) {

            console.error(
                "Erro ao buscar produto:",
                error.message
            );

            return res.status(500).json({
                message: "Erro ao buscar produto."
            });

        }

    }
);

//--------------------------------------------------------------------------------------------------------
// PATCH - atualizar produto

router.patch(
    "/produtos/:id_produto",
    autenticarToken,
    async (req, res) => {

        const { id_produto } = req.params;

        const {
            nome,
            descricao,
            preco,
            estoque,
            sob_encomenda,
            tempo_producao,
            material,
            categoria_id,
            destaque
        } = req.body;

        try {

            // Verifica se o produto existe
            const verificarProduto = await BD.query(
                `
                    SELECT *
                    FROM produtos
                    WHERE id_produto = $1
                    AND ativo = TRUE
                `,
                [id_produto]
            );

            if (verificarProduto.rows.length === 0) {

                return res.status(404).json({
                    message: "Produto não encontrado."
                });

            }

            const produtoAtual =
                verificarProduto.rows[0];

            // Valida nome
            if (
                nome !== undefined &&
                (
                    nome === null ||
                    nome.trim() === ""
                )
            ) {

                return res.status(400).json({
                    message: "O nome do produto é obrigatório."
                });

            }

            // Valida preço
            if (
                preco !== undefined &&
                Number(preco) < 0
            ) {

                return res.status(400).json({
                    message: "O preço não pode ser negativo."
                });

            }

            // Valida estoque
            if (
                estoque !== undefined &&
                Number(estoque) < 0
            ) {

                return res.status(400).json({
                    message: "O estoque não pode ser negativo."
                });

            }

            // Se alterar categoria, verifica se existe
            if (categoria_id !== undefined) {

                const categoria = await BD.query(
                    `
                        SELECT id_categoria
                        FROM categorias
                        WHERE id_categoria = $1
                        AND ativo = TRUE
                    `,
                    [categoria_id]
                );

                if (categoria.rows.length === 0) {

                    return res.status(404).json({
                        message: "Categoria não encontrada."
                    });

                }

            }

            /*
            Verifica como ficará o produto depois da atualização.
            Isso evita deixar um produto sob encomenda sem tempo
            de produção.
            */

            const novoSobEncomenda =
                sob_encomenda !== undefined
                    ? sob_encomenda
                    : produtoAtual.sob_encomenda;

            const novoTempoProducao =
                tempo_producao !== undefined
                    ? tempo_producao
                    : produtoAtual.tempo_producao;

            if (
                novoSobEncomenda === true &&
                (
                    !novoTempoProducao ||
                    novoTempoProducao.trim() === ""
                )
            ) {

                return res.status(400).json({
                    message: "Informe o tempo de produção para produtos sob encomenda."
                });

            }

            const campos = [];
            const valores = [];

            let contador = 1;

            if (nome !== undefined) {

                campos.push(
                    `nome = $${contador}`
                );

                valores.push(nome.trim());

                contador++;

            }

            if (descricao !== undefined) {

                campos.push(
                    `descricao = $${contador}`
                );

                valores.push(descricao);

                contador++;

            }

            if (preco !== undefined) {

                campos.push(
                    `preco = $${contador}`
                );

                valores.push(preco);

                contador++;

            }

            if (estoque !== undefined) {

                campos.push(
                    `estoque = $${contador}`
                );

                valores.push(estoque);

                contador++;

            }

            if (sob_encomenda !== undefined) {

                campos.push(
                    `sob_encomenda = $${contador}`
                );

                valores.push(sob_encomenda);

                contador++;

            }

            /*
            Quando sob_encomenda for falso, limpa automaticamente
            o tempo de produção.
            */

            if (sob_encomenda === false) {

                campos.push(
                    `tempo_producao = $${contador}`
                );

                valores.push(null);

                contador++;

            } else if (tempo_producao !== undefined) {

                campos.push(
                    `tempo_producao = $${contador}`
                );

                valores.push(tempo_producao);

                contador++;

            }

            if (material !== undefined) {

                campos.push(
                    `material = $${contador}`
                );

                valores.push(material);

                contador++;

            }

            if (categoria_id !== undefined) {

                campos.push(
                    `categoria_id = $${contador}`
                );

                valores.push(categoria_id);

                contador++;

            }

            if (destaque !== undefined) {

                campos.push(
                    `destaque = $${contador}`
                );

                valores.push(destaque);

                contador++;

            }

            if (campos.length === 0) {

                return res.status(400).json({
                    message: "Nenhum campo foi enviado para atualização."
                });

            }

            valores.push(id_produto);

            const comando = `
                UPDATE produtos
                SET ${campos.join(", ")}
                WHERE id_produto = $${contador}
                RETURNING id_produto
            `;

            const resultado = await BD.query(
                comando,
                valores
            );

            return res.status(200).json({
                message: "Produto atualizado com sucesso.",
                id_produto:
                    resultado.rows[0].id_produto
            });

        } catch (error) {

            console.error(
                "Erro ao atualizar produto:",
                error.message
            );

            return res.status(500).json({
                message: "Erro interno no servidor."
            });

        }

    }
);

//--------------------------------------------------------------------------------------------------------
// DELETE - desativar produto

router.delete(
    "/produtos/:id_produto",
    autenticarToken,
    async (req, res) => {

        const { id_produto } = req.params;

        try {

            // Verifica se o produto existe e está ativo
            const verificarProduto = await BD.query(
                `
                    SELECT id_produto
                    FROM produtos
                    WHERE id_produto = $1
                    AND ativo = TRUE
                `,
                [id_produto]
            );

            if (verificarProduto.rows.length === 0) {

                return res.status(404).json({
                    message: "Produto não encontrado."
                });

            }

            // Desativa o produto
            await BD.query(
                `
                    UPDATE produtos
                    SET ativo = FALSE
                    WHERE id_produto = $1
                `,
                [id_produto]
            );

            return res.status(200).json({
                message: "Produto desativado com sucesso."
            });

        } catch (error) {

            console.error(
                "Erro ao desativar produto:",
                error.message
            );

            return res.status(500).json({
                message: "Erro interno no servidor."
            });

        }

    }
);

export default router;