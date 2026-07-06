const categorias = {

    "/categorias": {

        post: {

            tags: ["Categorias"],

            summary: "Cadastrar ou reativar categoria",

            description:
                "Cadastra uma nova categoria. Caso já exista uma categoria desativada com o mesmo nome, ela será reativada.",

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
                                    nullable: true,
                                    example: "Produtos feitos em crochê."
                                }

                            }

                        },

                        example: {
                            nome: "Amigurumi",
                            descricao: "Produtos feitos em crochê."
                        }

                    }

                }

            },

            responses: {

                201: {

                    description: "Categoria cadastrada com sucesso.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Categoria cadastrada com sucesso.",
                                categoria: {
                                    id_categoria: 1,
                                    nome: "Amigurumi",
                                    descricao: "Produtos feitos em crochê.",
                                    ativo: true
                                }
                            }

                        }

                    }

                },

                200: {

                    description: "Categoria desativada reativada com sucesso.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Categoria reativada com sucesso.",
                                categoria: {
                                    id_categoria: 1,
                                    nome: "Amigurumi",
                                    descricao: "Produtos feitos em crochê.",
                                    ativo: true
                                }
                            }

                        }

                    }

                },

                400: {

                    description:
                        "Nome não informado ou já existe uma categoria ativa com esse nome.",

                    content: {

                        "application/json": {

                            examples: {

                                nomeObrigatorio: {
                                    value: {
                                        message: "O nome da categoria é obrigatório."
                                    }
                                },

                                categoriaDuplicada: {
                                    value: {
                                        message: "Já existe uma categoria com esse nome."
                                    }
                                }

                            }

                        }

                    }

                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
                },

                500: {

                    description: "Erro ao cadastrar categoria.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Erro ao cadastrar categoria."
                            }

                        }

                    }

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

                    description: "Lista de categorias retornada com sucesso.",

                    content: {

                        "application/json": {

                            schema: {

                                type: "array",

                                items: {

                                    type: "object",

                                    properties: {

                                        id_categoria: {
                                            type: "integer",
                                            example: 1
                                        },

                                        nome: {
                                            type: "string",
                                            example: "Amigurumi"
                                        },

                                        descricao: {
                                            type: "string",
                                            nullable: true,
                                            example: "Produtos feitos em crochê."
                                        },

                                        ativo: {
                                            type: "boolean",
                                            example: true
                                        }

                                    }

                                }

                            },

                            example: [
                                {
                                    id_categoria: 1,
                                    nome: "Amigurumi",
                                    descricao: "Produtos feitos em crochê.",
                                    ativo: true
                                },
                                {
                                    id_categoria: 2,
                                    nome: "Decoração",
                                    descricao: "Tapetes e itens decorativos.",
                                    ativo: true
                                }
                            ]

                        }

                    }

                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
                },

                500: {

                    description: "Erro ao listar categorias.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Erro ao listar categorias."
                            }

                        }

                    }

                }

            }

        }

    },

    "/categorias/{id_categoria}": {

        get: {

            tags: ["Categorias"],

            summary: "Buscar categoria por ID",

            description: "Retorna os dados de uma categoria ativa pelo ID.",

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
                    description: "ID da categoria",
                    schema: {
                        type: "integer",
                        example: 1
                    }
                }

            ],

            responses: {

                200: {

                    description: "Categoria encontrada com sucesso.",

                    content: {

                        "application/json": {

                            example: {
                                id_categoria: 1,
                                nome: "Amigurumi",
                                descricao: "Produtos feitos em crochê.",
                                ativo: true
                            }

                        }

                    }

                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
                },

                404: {

                    description: "Categoria não encontrada.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Categoria não encontrada."
                            }

                        }

                    }

                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        },

        patch: {

            tags: ["Categorias"],

            summary: "Atualizar categoria",

            description:
                "Atualiza parcialmente os dados de uma categoria ativa.",

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
                    description: "ID da categoria",
                    schema: {
                        type: "integer",
                        example: 1
                    }
                }

            ],

            requestBody: {

                required: true,

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
                                    nullable: true,
                                    example: "Categoria atualizada."
                                }

                            }

                        },

                        example: {
                            nome: "Amigurumis",
                            descricao: "Categoria atualizada."
                        }

                    }

                }

            },

            responses: {

                200: {

                    description: "Categoria atualizada com sucesso.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Categoria atualizada com sucesso."
                            }

                        }

                    }

                },

                400: {

                    description:
                        "Nenhum campo informado ou nome já utilizado.",

                    content: {

                        "application/json": {

                            examples: {

                                nenhumCampo: {
                                    value: {
                                        message: "Nenhum campo foi informado."
                                    }
                                },

                                nomeDuplicado: {
                                    value: {
                                        message: "Já existe uma categoria com esse nome."
                                    }
                                }

                            }

                        }

                    }

                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
                },

                404: {

                    description: "Categoria não encontrada.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Categoria não encontrada."
                            }

                        }

                    }

                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        },

        delete: {

            tags: ["Categorias"],

            summary: "Desativar categoria",

            description:
                "Desativa uma categoria pelo ID. A categoria permanece no banco, mas deixa de aparecer no sistema.",

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
                    description: "ID da categoria",
                    schema: {
                        type: "integer",
                        example: 1
                    }
                }

            ],

            responses: {

                200: {

                    description: "Categoria desativada com sucesso.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Categoria desativada com sucesso."
                            }

                        }

                    }

                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
                },

                404: {

                    description: "Categoria não encontrada.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Categoria não encontrada."
                            }

                        }

                    }

                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        }

    }

};

export default categorias;