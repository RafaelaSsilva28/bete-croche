import usuarios from "../docs/usuarios.js";
import login from "../docs/login.js";
import categorias from "../docs/categorias.js";
import produtos from "../docs/produtos.js";
import imagens from "../docs/imagens.js";
import dashboard from "../docs/dashboard.js";
const documentacao = {
    openapi: "3.0.3",

    info: {
        title: "🧶 API de Crochê 🧶",
        description: "Documentação da API do sistema de gerenciamento da loja de crochê.",
        version: "1.0.0"
    },

   servers: [
    {
        url: "https://bete-croche-artesanal.up.railway.app",
        description: "Servidor online"
    },
    {
        url: "http://localhost:3001",
        description: "Servidor local"
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
        },
        {
            name: "Dashboard",
            description: "Gerenciamento de todos os dados Produtos, categorias, imagens e ativos"
        }
    ],

    paths: {
        ...login,
        ...usuarios,
        ...categorias,
        ...produtos,
        ...imagens,
        ...dashboard
    }
};

export default documentacao;