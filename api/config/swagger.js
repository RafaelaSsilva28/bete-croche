import usuarios from "../docs/usuarios.js";
import login from "../docs/login.js";
import categorias from "../docs/categorias.js";
// import produtos from "../docs/produtos.js";
// import imagens from "../docs/imagens.js";

const documentacao = {
    openapi: "3.0.3",

    info: {
        title: "🧶 API de Crochê 🧶",
        description: "Documentação da API do sistema de gerenciamento da loja de crochê.",
        version: "1.0.0"
    },

    servers: [
        {
            url: "http://localhost:3001",
            description: "Servidor Local"
        }
    ],

    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },

    security: [
        {
            BearerAuth: []
        }
    ],

    tags: [
        {
            name: "Login",
            description: "Autenticação"
        },
        {
            name: "Usuários",
            description: "Gerenciamento de usuários"
        },
        {
            name: "Categorias",
            description: "Gerenciamento de categorias"
        },
        {
            name: "Produtos",
            description: "Gerenciamento de produtos"
        },
        {
            name: "Imagens",
            description: "Gerenciamento das imagens dos produtos"
        }
    ],

    paths: {
        ...login,
        ...usuarios,
        ...categorias,
        // ...produtos,
        // ...imagens
    }
};

export default documentacao;