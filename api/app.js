import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";

import { testarConexao } from "./db.js";

import rotasCategorias from "./src/routes/rotasCategorias.js";
import rotasUsuarios from "./src/routes/rotasUsuarios.js";
import rotasProdutos from "./src/routes/rotasProdutos.js";
import rotasLogin from "./src/routes/rotasLogin.js";
import rotasImagens from "./src/routes/rotasImagens.js";
import rotasDashboard from "./src/routes/rotasDashboard.js";

import swaggerUi from "swagger-ui-express";
import documentacao from "./config/swagger.js";

const app = express();

/* ========================= */
/* PORTA */
/* ========================= */

const porta = process.env.PORT || 3001;

/* ========================= */
/* PASTA DE UPLOADS */
/* ========================= */

const caminhoUploads = path.join(
    process.cwd(),
    "src",
    "uploads"
);

if (!fs.existsSync(caminhoUploads)) {

    fs.mkdirSync(caminhoUploads, {
        recursive: true
    });

}

/* ========================= */
/* CORS */
/* ========================= */

const origensPermitidas = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
];

if (process.env.FRONTEND_URL) {

    const urlsFrontend = process.env.FRONTEND_URL
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean);

    origensPermitidas.push(...urlsFrontend);

}

app.use(
    cors({
        origin: function (origem, callback) {

            if (!origem) {

                return callback(null, true);

            }

            if (origensPermitidas.includes(origem)) {

                return callback(null, true);

            }

            return callback(
                new Error(
                    "Origem não permitida pelo CORS."
                )
            );

        },
        methods: [
            "GET",
            "POST",
            "PATCH",
            "PUT",
            "DELETE",
            "OPTIONS"
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

/* ========================= */
/* CONFIGURAÇÕES */
/* ========================= */

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

/* ========================= */
/* IMAGENS */
/* ========================= */

app.use(
    "/uploads",
    express.static(caminhoUploads)
);

/* ========================= */
/* SWAGGER */
/* ========================= */

app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(documentacao)
);

/* ========================= */
/* ROTAS DE TESTE */
/* ========================= */

app.get("/", (req, res) => {

    res.redirect("/swagger");

});

app.get("/health", async (req, res) => {

    try {

        await testarConexao();

        return res.status(200).json({
            status: "online",
            message: "API Elizabeth Crochê funcionando."
        });

    } catch (erro) {

        console.log(
            "Erro na verificação da API:",
            erro
        );

        return res.status(500).json({
            status: "erro",
            message: "Não foi possível conectar ao banco de dados."
        });

    }

});

/* ========================= */
/* ROTAS */
/* ========================= */

app.use(rotasCategorias);
app.use(rotasUsuarios);
app.use(rotasImagens);
app.use(rotasLogin);
app.use(rotasProdutos);
app.use(rotasDashboard);

/* ========================= */
/* ROTA NÃO ENCONTRADA */
/* ========================= */

app.use((req, res) => {

    return res.status(404).json({
        message: "Rota não encontrada."
    });

});

/* ========================= */
/* TRATAMENTO DE ERROS */
/* ========================= */

app.use((erro, req, res, next) => {

    console.log(
        "Erro interno da API:",
        erro
    );

    if (erro.message === "Origem não permitida pelo CORS.") {

        return res.status(403).json({
            message: erro.message
        });

    }

    return res.status(500).json({
        message: "Erro interno do servidor."
    });

});

/* ========================= */
/* INICIAR SERVIDOR */
/* ========================= */

app.listen(porta, () => {

    console.log(
        `API funcionando na porta ${porta}`
    );

    console.log(
        `Swagger: http://localhost:${porta}/swagger`
    );

});