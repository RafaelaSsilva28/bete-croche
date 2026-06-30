const imagens = {

    "/produtos/{produto_id}/imagens": {

        post: {

            tags: ["Imagens"],

            summary: "Cadastrar imagens do produto",

            description: "Realiza o upload de uma ou mais imagens para um produto.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [
                {
                    name: "produto_id",
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
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            required: ["imagens"],
                            properties: {

                                imagens: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                        format: "binary"
                                    }
                                }

                            }
                        }
                    }
                }
            },

            responses: {

                201: {
                    description: "Imagem(ns) cadastrada(s) com sucesso."
                },

                400: {
                    description: "Nenhuma imagem foi enviada."
                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido."
                },

                404: {
                    description: "Produto não encontrado."
                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        },

        get: {

            tags: ["Imagens"],

            summary: "Listar imagens do produto",

            description: "Lista todas as imagens cadastradas de um produto.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [
                {
                    name: "produto_id",
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
                    description: "Lista de imagens retornada com sucesso."
                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido."
                },

                404: {
                    description: "Produto não encontrado."
                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        }

    },
    "/imagens/{id_imagem}/principal": {

        patch: {

            tags: ["Imagens"],

            summary: "Definir imagem principal",

            description: "Define uma imagem como principal para o produto.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [
                {
                    name: "id_imagem",
                    in: "path",
                    required: true,
                    description: "ID da imagem",
                    schema: {
                        type: "integer",
                        example: 1
                    }
                }
            ],

            responses: {

                200: {
                    description: "Imagem principal atualizada com sucesso."
                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido."
                },

                404: {
                    description: "Imagem não encontrada."
                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        }

    },

    "/imagens/{id_imagem}": {

        delete: {

            tags: ["Imagens"],

            summary: "Excluir imagem",

            description: "Exclui uma imagem do produto.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [
                {
                    name: "id_imagem",
                    in: "path",
                    required: true,
                    description: "ID da imagem",
                    schema: {
                        type: "integer",
                        example: 1
                    }
                }
            ],

            responses: {

                200: {
                    description: "Imagem excluída com sucesso."
                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido."
                },

                404: {
                    description: "Imagem não encontrada."
                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        }

    }

};

export default imagens;