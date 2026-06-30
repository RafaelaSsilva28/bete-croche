import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();


//--------------------------------------------------------------------------------------------------------
// POST - cadastrar categoria

router.post('/categorias', autenticarToken, async (req, res) => {

    const { nome, descricao } = req.body;

    try {

        const comando = `
            INSERT INTO categorias
            (nome, descricao)
            VALUES ($1, $2)
        `;

        const valores = [nome, descricao];

        await BD.query(comando, valores);

        return res.status(201).json({
            message: "Categoria cadastrada com sucesso"
        });

    } catch (error) {

        console.log("Erro ao cadastrar categoria", error.message);

        return res.status(500).json({
            error: "Erro ao cadastrar categoria"
        });

    }

});
//--------------------------------------------------------------------------------------------------------
// GET - listar categorias

router.get('/categorias', async (req, res) => {

    try {

        const query = `
            SELECT *
            FROM categorias
            WHERE ativo = TRUE
            ORDER BY id_categoria
        `;

        const categorias = await BD.query(query);

        return res.status(200).json(categorias.rows);

    } catch (error) {

        console.log("Erro ao listar categorias", error.message);

        return res.status(500).json({
            error: "Erro ao listar categorias"
        });

    }

});
//--------------------------------------------------------------------------------------------------------
// GET - buscar categoria por ID

router.get('/categorias/:id_categoria', async (req, res) => {

    const { id_categoria } = req.params;

    try {

        const query = `
            SELECT *
            FROM categorias
            WHERE id_categoria = $1
            AND ativo = TRUE
        `;

        const categoria = await BD.query(query, [id_categoria]);

        if (categoria.rows.length === 0) {
            return res.status(404).json({
                message: "Categoria não encontrada"
            });
        }

        return res.status(200).json(categoria.rows[0]);

    } catch (error) {

        console.log("Erro ao buscar categoria", error.message);

        return res.status(500).json({
            error: "Erro ao buscar categoria"
        });

    }

});
//--------------------------------------------------------------------------------------------------------
// PATCH - atualização parcial da categoria

router.patch('/categorias/:id_categoria', autenticarToken,async (req, res) => {

    const { id_categoria } = req.params;
    const { nome, descricao } = req.body;

    try {

        const verificar = await BD.query(
            `SELECT * FROM categorias WHERE id_categoria = $1`,
            [id_categoria]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({
                message: "Categoria não encontrada"
            });
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) {
            campos.push(`nome = $${contador}`);
            valores.push(nome);
            contador++;
        }

        if (descricao !== undefined) {
            campos.push(`descricao = $${contador}`);
            valores.push(descricao);
            contador++;
        }

        if (campos.length === 0) {
            return res.status(400).json({
                message: "Nenhum campo para atualizar"
            });
        }

        valores.push(id_categoria);

        const comando = `
            UPDATE categorias
            SET ${campos.join(', ')}
            WHERE id_categoria = $${contador}
        `;

        await BD.query(comando, valores);

        return res.status(200).json({
            message: "Categoria atualizada com sucesso"
        });

    } catch (error) {

        console.error("Erro ao atualizar categoria", error.message);

        return res.status(500).json({
            message: "Erro interno no servidor"
        });

    }

});
//--------------------------------------------------------------------------------------------------------
// DELETE - desativar categoria

router.delete('/categorias/:id_categoria', async (req, res) => {

    const { id_categoria } = req.params;

    try {

        const verificar = await BD.query(
            `SELECT * FROM categorias WHERE id_categoria = $1`,
            [id_categoria]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({
                message: "Categoria não encontrada"
            });
        }

        await BD.query(
            `UPDATE categorias
             SET ativo = FALSE
             WHERE id_categoria = $1`,
            [id_categoria]
        );

        return res.status(200).json({
            message: "Categoria desativada com sucesso"
        });

    } catch (error) {

        console.error("Erro ao desativar categoria", error.message);

        return res.status(500).json({
            message: "Erro interno no servidor"
        });

    }

});


export default router;