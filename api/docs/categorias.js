const categorias = {

    "/categorias": {

        post: {

            tags: ["Categorias"],

            summary: "Cadastrar categoria",

            description: "Realiza o cadastro de uma nova categoria.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            requestBody: {

                required: true,

                content: {

                    "application/json": {

                        schema: {

                            type: "object",

                            required: [
                                "nome"
                            ],

                            properties: {

                                nome: {
                                    type: "string",
                                    example: "Amigurumi"
                                },

                                descricao: {
                                    type: "string",
                                    example: "Produtos feitos em crochê."
                                }

                            }

                        }

                    }

                }

            },

            responses: {

                201: {
                    description: "Categoria cadastrada com sucesso."
                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        },

        get: {

            tags: ["Categorias"],

            summary: "Listar categorias",

            description: "Lista todas as categorias ativas.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            responses: {

                200: {

                    description: "Lista de categorias."

                },

                401: {

                    description: "Token não fornecido."

                },

                403: {

                    description: "Token inválido ou expirado."

                },

                500: {

                    description: "Erro interno do servidor."

                }

            }

        }

    },

    "/categorias/{id_categoria}": {

        get: {

            tags: ["Categorias"],

            summary: "Buscar categoria por ID",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [

                {

                    name: "id_categoria",

                    in: "path",

                    required: true,

                    schema: {

                        type: "integer"

                    },

                    example: 1

                }

            ],

            responses: {

                200: {

                    description: "Categoria encontrada."

                },

                401: {

                    description: "Token não fornecido."

                },

                403: {

                    description: "Token inválido."

                },

                404: {

                    description: "Categoria não encontrada."

                }

            }

        },

        patch: {

            tags: ["Categorias"],

            summary: "Atualizar categoria",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [

                {

                    name: "id_categoria",

                    in: "path",

                    required: true,

                    schema: {

                        type: "integer"

                    },

                    example: 1

                }

            ],

            requestBody: {

                content: {

                    "application/json": {

                        schema: {

                            type: "object",

                            properties: {

                                nome: {

                                    type: "string",

                                    example: "Amigurumis"

                                },

                                descricao: {

                                    type: "string",

                                    example: "Categoria atualizada."

                                }

                            }

                        }

                    }

                }

            },

            responses: {

                200: {

                    description: "Categoria atualizada."

                },

                400: {

                    description: "Nenhum campo informado."

                },

                401: {

                    description: "Token não fornecido."

                },

                403: {

                    description: "Token inválido."

                },

                404: {

                    description: "Categoria não encontrada."

                }

            }

        },

        delete: {

            tags: ["Categorias"],

            summary: "Desativar categoria",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [

                {

                    name: "id_categoria",

                    in: "path",

                    required: true,

                    schema: {

                        type: "integer"

                    },

                    example: 1

                }

            ],

            responses: {

                200: {

                    description: "Categoria desativada."

                },

                401: {

                    description: "Token não fornecido."

                },

                403: {

                    description: "Token inválido."

                },

                404: {

                    description: "Categoria não encontrada."

                }

            }

        }

    }

};

export default categorias;