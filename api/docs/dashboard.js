const dashboard = {

    "/dashboard": {

        get: {

            tags: ["Dashboard"],

            summary: "Resumo do painel administrativo",

            description: "Retorna totais gerais e os últimos produtos cadastrados para o dashboard administrativo.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            responses: {

                200: {

                    description: "Dados do dashboard retornados com sucesso.",

                    content: {

                        "application/json": {

                            schema: {

                                type: "object",

                                properties: {

                                    produtos: {
                                        type: "integer",
                                        example: 28
                                    },

                                    produtosAtivos: {
                                        type: "integer",
                                        example: 24
                                    },

                                    categorias: {
                                        type: "integer",
                                        example: 8
                                    },

                                    categoriasAtivas: {
                                        type: "integer",
                                        example: 7
                                    },

                                    imagens: {
                                        type: "integer",
                                        example: 64
                                    },

                                    ultimosProdutos: {

                                        type: "array",

                                        items: {

                                            type: "object",

                                            properties: {

                                                id_produto: {
                                                    type: "integer",
                                                    example: 28
                                                },

                                                nome: {
                                                    type: "string",
                                                    example: "Bolsa Floral"
                                                },

                                                preco: {
                                                    type: "number",
                                                    example: 89.9
                                                },

                                                imagem_principal: {
                                                    type: "string",
                                                    example: "bolsa-floral.jpg"
                                                }

                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }

                },

                401: {
                    description: "Token não informado."
                },

                403: {
                    description: "Token inválido."
                },

                500: {
                    description: "Erro interno no servidor."
                }

            }

        }

    }

};

export default dashboard;