const produtos = {

    "/produtos": {

        post: {

            tags: ["Produtos"],

            summary: "Cadastrar produto",

            description: "Realiza o cadastro de um novo produto e retorna o ID do produto cadastrado.",

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
                                "nome",
                                "preco",
                                "categoria_id"
                            ],

                            properties: {

                                nome: {
                                    type: "string",
                                    example: "Urso de Crochê"
                                },

                                descricao: {
                                    type: "string",
                                    example: "Urso feito artesanalmente."
                                },

                                preco: {
                                    type: "number",
                                    format: "float",
                                    example: 120.90
                                },

                                estoque: {
                                    type: "integer",
                                    example: 5,
                                    default: 0
                                },

                                sob_encomenda: {
                                    type: "boolean",
                                    example: true,
                                    default: true
                                },

                                tempo_producao: {
                                    type: "string",
                                    nullable: true,
                                    example: "7 dias"
                                },

                                material: {
                                    type: "string",
                                    nullable: true,
                                    example: "Fio Amigurumi"
                                },

                                categoria_id: {
                                    type: "integer",
                                    example: 1
                                },

                                destaque: {
                                    type: "boolean",
                                    example: false,
                                    default: false
                                }

                            }

                        }

                    }

                }

            },

            responses: {

                201: {

                    description: "Produto cadastrado com sucesso.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Produto cadastrado com sucesso.",
                                id_produto: 1
                            }

                        }

                    }

                },

                400: {
                    description: "Dados obrigatórios ausentes ou inválidos."
                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
                },

                404: {
                    description: "Categoria não encontrada."
                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        },

        get: {

            tags: ["Produtos"],

            summary: "Listar produtos",

            description: "Lista todos os produtos ativos, incluindo a categoria e a imagem principal.",

            responses: {

                200: {

                    description: "Lista de produtos retornada com sucesso.",

                    content: {

                        "application/json": {

                            schema: {

                                type: "array",

                                items: {

                                    type: "object",

                                    properties: {

                                        id_produto: {
                                            type: "integer",
                                            example: 1
                                        },

                                        nome: {
                                            type: "string",
                                            example: "Urso de Crochê"
                                        },

                                        descricao: {
                                            type: "string",
                                            example: "Urso feito artesanalmente."
                                        },

                                        preco: {
                                            type: "number",
                                            format: "float",
                                            example: 120.90
                                        },

                                        estoque: {
                                            type: "integer",
                                            example: 5
                                        },

                                        sob_encomenda: {
                                            type: "boolean",
                                            example: true
                                        },

                                        tempo_producao: {
                                            type: "string",
                                            nullable: true,
                                            example: "7 dias"
                                        },

                                        material: {
                                            type: "string",
                                            nullable: true,
                                            example: "Fio Amigurumi"
                                        },

                                        destaque: {
                                            type: "boolean",
                                            example: false
                                        },

                                        id_categoria: {
                                            type: "integer",
                                            example: 1
                                        },

                                        categoria: {
                                            type: "string",
                                            example: "Amigurumi"
                                        },

                                        imagem_principal: {
                                            type: "string",
                                            nullable: true,
                                            example: "urso-1750000000000.jpg"
                                        }

                                    }

                                }

                            }

                        }

                    }

                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        }

    },

    "/produtos/{id_produto}": {

        get: {

            tags: ["Produtos"],

            summary: "Buscar produto por ID",

            description: "Retorna os dados completos de um produto, sua categoria e todas as imagens cadastradas.",

            parameters: [

                {
                    name: "id_produto",
                    in: "path",
                    required: true,
                    description: "ID do produto",
                    schema: {
                        type: "integer",
                        example: 1
                    }
                }

            ],

            responses: {

                200: {

                    description: "Produto encontrado com sucesso.",

                    content: {

                        "application/json": {

                            schema: {

                                type: "object",

                                properties: {

                                    id_produto: {
                                        type: "integer",
                                        example: 1
                                    },

                                    nome: {
                                        type: "string",
                                        example: "Urso de Crochê"
                                    },

                                    descricao: {
                                        type: "string",
                                        example: "Urso feito artesanalmente."
                                    },

                                    preco: {
                                        type: "number",
                                        format: "float",
                                        example: 120.90
                                    },

                                    estoque: {
                                        type: "integer",
                                        example: 5
                                    },

                                    sob_encomenda: {
                                        type: "boolean",
                                        example: true
                                    },

                                    tempo_producao: {
                                        type: "string",
                                        nullable: true,
                                        example: "7 dias"
                                    },

                                    material: {
                                        type: "string",
                                        nullable: true,
                                        example: "Fio Amigurumi"
                                    },

                                    destaque: {
                                        type: "boolean",
                                        example: false
                                    },

                                    categoria: {

                                        type: "object",

                                        properties: {

                                            id_categoria: {
                                                type: "integer",
                                                example: 1
                                            },

                                            nome: {
                                                type: "string",
                                                example: "Amigurumi"
                                            }

                                        }

                                    },

                                    imagens: {

                                        type: "array",

                                        items: {

                                            type: "object",

                                            properties: {

                                                id_imagem: {
                                                    type: "integer",
                                                    example: 1
                                                },

                                                caminho_imagem: {
                                                    type: "string",
                                                    example: "urso-1750000000000.jpg"
                                                },

                                                principal: {
                                                    type: "boolean",
                                                    example: true
                                                }

                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }

                },

                404: {
                    description: "Produto não encontrado."
                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        },

        patch: {

            tags: ["Produtos"],

            summary: "Atualizar produto",

            description: "Atualiza parcialmente os dados de um produto. Apenas os campos enviados serão alterados.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [

                {
                    name: "id_produto",
                    in: "path",
                    required: true,
                    description: "ID do produto",
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
                                    example: "Urso atualizado"
                                },

                                descricao: {
                                    type: "string",
                                    example: "Descrição atualizada."
                                },

                                preco: {
                                    type: "number",
                                    format: "float",
                                    example: 150.00
                                },

                                estoque: {
                                    type: "integer",
                                    example: 10
                                },

                                sob_encomenda: {
                                    type: "boolean",
                                    example: false
                                },

                                tempo_producao: {
                                    type: "string",
                                    nullable: true,
                                    example: "5 dias"
                                },

                                material: {
                                    type: "string",
                                    nullable: true,
                                    example: "Algodão"
                                },

                                categoria_id: {
                                    type: "integer",
                                    example: 2
                                },

                                destaque: {
                                    type: "boolean",
                                    example: true
                                }

                            }

                        }

                    }

                }

            },

            responses: {

                200: {

                    description: "Produto atualizado com sucesso.",

                    content: {

                        "application/json": {

                            example: {
                                message: "Produto atualizado com sucesso.",
                                id_produto: 1
                            }

                        }

                    }

                },

                400: {
                    description: "Dados inválidos ou nenhum campo enviado."
                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
                },

                404: {
                    description: "Produto ou categoria não encontrados."
                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        },

        delete: {

            tags: ["Produtos"],

            summary: "Desativar produto",

            description: "Desativa um produto pelo ID. O produto permanece no banco de dados, mas deixa de aparecer no site.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [

                {
                    name: "id_produto",
                    in: "path",
                    required: true,
                    description: "ID do produto",
                    schema: {
                        type: "integer",
                        example: 1
                    }
                }

            ],

            responses: {

                200: {
                    description: "Produto desativado com sucesso."
                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
                },

                404: {
                    description: "Produto não encontrado."
                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        }

    }

};

export default produtos;