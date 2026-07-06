import "dotenv/config";

import pg from "pg";

const { Pool } = pg;

const estaEmProducao =
    process.env.NODE_ENV === "production";

const configuracaoBanco = process.env.DATABASE_URL
    ? {
        connectionString:
            process.env.DATABASE_URL,

        ssl: estaEmProducao
            ? {
                rejectUnauthorized: false
            }
            : false
    }
    : {
        user:
            process.env.DB_USER,

        host:
            process.env.DB_HOST,

        password:
            process.env.DB_PASSWORD,

        database:
            process.env.DB_DATABASE,

        port:
            Number(process.env.DB_PORT) || 5432
    };

const BD = new Pool(configuracaoBanco);

BD.on("error", (erro) => {

    console.error(
        "Erro inesperado no PostgreSQL:",
        erro.message
    );

});

async function testarConexao() {

    let cliente;

    try {

        cliente = await BD.connect();

        console.log(
            "Conexão com o banco estabelecida."
        );

        return true;

    } catch (erro) {

        console.error(
            "Erro ao conectar com o banco:",
            erro.message
        );

        throw erro;

    } finally {

        if (cliente) {
            cliente.release();
        }

    }

}

export {
    BD,
    testarConexao
};