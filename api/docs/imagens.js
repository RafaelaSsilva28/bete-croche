const imagens = {

    "/produtos/{produto_id}/imagens": {

        post: {

            tags: ["Imagens"],

            summary: "Cadastrar imagens do produto",

            description: "Realiza o upload de uma ou mais imagens. Cada produto pode possuir no máximo 4 imagens. Caso ainda não exista uma capa, a primeira imagem enviada será definida como principal.",

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

                                    maxItems: 4,

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

                    description: "Imagem(ns) cadastrada(s) com sucesso.",

                    content: {

                        "application/json": {

                            example: {

                                message: "Imagem(ns) cadastrada(s) com sucesso.",

                                imagens: [
                                    {
                                        id_imagem: 1,
                                        caminho_imagem: "urso-1750000000000.jpg",
                                        principal: true
                                    },
                                    {
                                        id_imagem: 2,
                                        caminho_imagem: "urso-1750000000001.jpg",
                                        principal: false
                                    }
                                ]

                            }

                        }

                    }

                },

                400: {
                    description: "Nenhuma imagem foi enviada ou o limite de 4 imagens foi ultrapassado."
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

        },

        get: {

            tags: ["Imagens"],

            summary: "Listar imagens do produto",

            description: "Lista todas as imagens cadastradas de um produto. A imagem principal é retornada primeiro.",

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

                    description: "Lista de imagens retornada com sucesso.",

                    content: {

                        "application/json": {

                            schema: {

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

            description: "Define uma imagem como capa do produto. A capa anterior será automaticamente desmarcada, garantindo somente uma imagem principal.",

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
                    description: "Imagem principal atualizada com sucesso ou a imagem já é a capa."
                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
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

            description: "Exclui uma imagem do produto e remove o arquivo da pasta uploads. A única imagem do produto não pode ser excluída. Caso a imagem excluída seja a capa, outra será definida automaticamente como principal.",

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

                400: {
                    description: "O produto precisa possuir pelo menos uma imagem."
                },

                401: {
                    description: "Token não fornecido."
                },

                403: {
                    description: "Token inválido ou expirado."
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