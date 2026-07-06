import express from "express";
import path from "path";

import { BD, testarConexao } from "./db.js";
import rotasCategorias from "./src/routes/rotasCategorias.js";
import rotasUsuarios from "./src/routes/rotasUsuarios.js";
import rotasProdutos from "./src/routes/rotasProdutos.js";
import rotasLogin from "./src/routes/rotasLogin.js";
import rotasImagens from "./src/routes/rotasImagens.js";
import rotasDashboard from "./src/routes/rotasDashboard.js";
import cors from "cors";

// SWAGGER
import swaggerUi from "swagger-ui-express";
import documentacao from "./config/swagger.js";

const app = express();

app.use(express.json());

// 👇 Permite acessar as imagens pelo navegador
app.use("/uploads", express.static(path.resolve("src/uploads")));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(documentacao));
app.use(cors());

app.get("/", async (req, res) => {
    await testarConexao();
    res.redirect("/swagger");
});

app.use(rotasCategorias);
app.use(rotasUsuarios);
app.use(rotasImagens);
app.use(rotasLogin);
app.use(rotasProdutos);
app.use(rotasDashboard)

const porta = 3001;

app.listen(porta, () => {
    console.log(`http://localhost:${porta}`);
});