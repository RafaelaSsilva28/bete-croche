import express from "express";
import {BD, testarConexao} from './db.js';
import rotasCategorias from './src/routes/rotasCategorias.js';
import rotasUsuarios from './src/routes/rotasUsuarios.js';
import rotasProdutos from './src/routes/rotasProdutos.js';
import rotasLogin from './src/routes/rotasLogin.js';
import rotasImagens from './src/routes/rotasImagens.js';

import cors from 'cors';

//------------------------------------ SWAGGER
//importando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from "./config/swagger.js";



// ----------------------------------------------------------------------------------
const app = express();
app.use(express.json());
//------------------------------------------------------------------------------------------ SWAGGER
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
app.use(cors())  //---CORS conectando BACK-END COM FRONT-END
//------------------------------------------------------------------------------------------

app.get('/', async(req, res) =>{
    await testarConexao();
    // res.status(200).json('API FUNCIONANDO');
//------------------------------- SWAGGER
    res.redirect('/swagger')
//---------------------------------
})

//utilizando rotas falando pro App que vamos urilizar as rotas em nossos metodos
app.use(rotasCategorias);
app.use(rotasUsuarios);
app.use(rotasImagens);
app.use(rotasLogin);
app.use(rotasProdutos);
const porta = 3001;
app.listen(porta, () =>{
    console.log(`http:localhost:${porta}`);
    
})