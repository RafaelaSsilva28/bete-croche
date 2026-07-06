import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

router.get("/dashboard", autenticarToken, async (req, res) => {

    try {

        const totalProdutos = await BD.query(`
            SELECT COUNT(*) 
            FROM produtos
        `);

        const produtosAtivos = await BD.query(`
            SELECT COUNT(*) 
            FROM produtos
            WHERE ativo = TRUE
        `);

        const totalCategorias = await BD.query(`
            SELECT COUNT(*) 
            FROM categorias
        `);

        const categoriasAtivas = await BD.query(`
            SELECT COUNT(*) 
            FROM categorias
            WHERE ativo = TRUE
        `);

        const totalImagens = await BD.query(`
            SELECT COUNT(*) 
            FROM imagens_produto
        `);

        const ultimosProdutos = await BD.query(`
            SELECT
                p.id_produto,
                p.nome,
                p.preco,
                i.caminho_imagem AS imagem_principal
            FROM produtos p
            LEFT JOIN imagens_produto i
                ON p.id_produto = i.produto_id
                AND i.principal = TRUE
            WHERE p.ativo = TRUE
            ORDER BY p.id_produto DESC
            LIMIT 5
        `);

        return res.status(200).json({
            produtos: Number(totalProdutos.rows[0].count),
            produtosAtivos: Number(produtosAtivos.rows[0].count),
            categorias: Number(totalCategorias.rows[0].count),
            categoriasAtivas: Number(categoriasAtivas.rows[0].count),
            imagens: Number(totalImagens.rows[0].count),
            ultimosProdutos: ultimosProdutos.rows
        });

    } catch (error) {

        console.error("Erro ao buscar dados do dashboard:", error.message);

        return res.status(500).json({
            message: "Erro ao buscar dados do dashboard."
        });

    }

});

export default router;