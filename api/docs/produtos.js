const produtos = {

    "/produtos": {

        post: {
            tags: ["Produtos"],
            summary: "Cadastrar produto",
            description: "Realiza o cadastro de um novo produto.",

            security: [
                { BearerAuth: [] }
            ],

            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["nome", "preco", "categoria_id"],
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
                                    example: "7 dias"
                                },

                                material: {
                                    type: "string",
                                    example: "Fio Amigurumi"
                                },

                                categoria_id: {
                                    type: "integer",
                                    example: 1
                                },

                                destaque: {
                                    type: "boolean",
                                    example: false
                                }
                            }
                        }
                    }
                }
            },

            responses: {
                201: { description: "Produto cadastrado com sucesso." },
                400: { description: "Dados inválidos." },
                401: { description: "Token não fornecido." },
                403: { description: "Token inválido." },
                500: { description: "Erro interno do servidor." }
            }
        },

        get: {
            tags: ["Produtos"],
            summary: "Listar produtos",
            description: "Lista todos os produtos ativos.",

            security: [
                { BearerAuth: [] }
            ],

            responses: {
                200: { description: "Lista de produtos." },
                401: { description: "Token não fornecido." },
                403: { description: "Token inválido." },
                500: { description: "Erro interno." }
            }
        }
    },

    "/produtos/{id}": {

        get: {
            tags: ["Produtos"],
            summary: "Buscar produto por ID",
            description: "Retorna os dados de um produto específico pelo ID.",

            security: [
                { BearerAuth: [] }
            ],

            parameters: [
                {
                    name: "id",
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
                200: { description: "Produto encontrado com sucesso." },
                404: { description: "Produto não encontrado." },
                401: { description: "Token não fornecido." },
                403: { description: "Token inválido." },
                500: { description: "Erro interno do servidor." }
            }
        },

        patch: {
            tags: ["Produtos"],
            summary: "Atualizar produto",
            description: "Atualiza parcialmente os dados de um produto.",

            security: [
                { BearerAuth: [] }
            ],

            parameters: [
                {
                    name: "id",
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
                                nome: { type: "string", example: "Urso atualizado" },
                                descricao: { type: "string", example: "Descrição atualizada" },
                                preco: { type: "number", example: 150.00 },
                                estoque: { type: "integer", example: 10 },
                                sob_encomenda: { type: "boolean", example: false },
                                tempo_producao: { type: "string", example: "5 dias" },
                                material: { type: "string", example: "Algodão" },
                                categoria_id: { type: "integer", example: 2 },
                                destaque: { type: "boolean", example: true }
                            }
                        }
                    }
                }
            },

            responses: {
                200: { description: "Produto atualizado com sucesso." },
                400: { description: "Dados inválidos." },
                404: { description: "Produto não encontrado." },
                401: { description: "Token não fornecido." },
                403: { description: "Token inválido." },
                500: { description: "Erro interno do servidor." }
            }
        },

        delete: {
            tags: ["Produtos"],
            summary: "Remover produto",
            description: "Remove um produto pelo ID.",

            security: [
                { BearerAuth: [] }
            ],

            parameters: [
                {
                    name: "id",
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
                200: { description: "Produto removido com sucesso." },
                404: { description: "Produto não encontrado." },
                401: { description: "Token não fornecido." },
                403: { description: "Token inválido." },
                500: { description: "Erro interno do servidor." }
            }
        }
    }
};

export default produtos;