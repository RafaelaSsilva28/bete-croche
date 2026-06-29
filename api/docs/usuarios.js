const usuarios = {

    "/usuarios": {

        post: {

            tags: ["Usuários"],

            summary: "Cadastrar usuário",

            description: "Realiza o cadastro de um novo usuário.",

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
                                "email",
                                "senha"
                            ],

                            properties: {

                                nome: {
                                    type: "string",
                                    example: "Maria Silva"
                                },

                                email: {
                                    type: "string",
                                    example: "maria@gmail.com"
                                },

                                senha: {
                                    type: "string",
                                    example: "123456"
                                }

                            }

                        }

                    }

                }

            },

            responses: {

                201: {
                    description: "Usuário cadastrado com sucesso."
                },

                400: {
                    description: "Dados inválidos."
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

            tags: ["Usuários"],

            summary: "Listar usuários",

            description: "Retorna todos os usuários ativos.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            responses: {

                200: {

                    description: "Lista de usuários.",

                    content: {

                        "application/json": {

                            schema: {

                                type: "array",

                                items: {

                                    type: "object",

                                    properties: {

                                        id_usuario: {
                                            type: "integer",
                                            example: 1
                                        },

                                        nome: {
                                            type: "string",
                                            example: "Maria Silva"
                                        },

                                        email: {
                                            type: "string",
                                            example: "maria@gmail.com"
                                        },

                                        ativo: {
                                            type: "boolean",
                                            example: true
                                        }

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
                    description: "Erro interno do servidor."
                }

            }

        }

    },
        "/usuarios/{id_usuario}": {

        get: {

            tags: ["Usuários"],

            summary: "Buscar usuário por ID",

            description: "Retorna um usuário específico através do ID.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [

                {

                    name: "id_usuario",

                    in: "path",

                    required: true,

                    schema: {

                        type: "integer"

                    },

                    description: "ID do usuário.",

                    example: 1

                }

            ],

            responses: {

                200: {

                    description: "Usuário encontrado.",

                    content: {

                        "application/json": {

                            schema: {

                                type: "object",

                                properties: {

                                    id_usuario: {
                                        type: "integer",
                                        example: 1
                                    },

                                    nome: {
                                        type: "string",
                                        example: "Maria Silva"
                                    },

                                    email: {
                                        type: "string",
                                        example: "maria@gmail.com"
                                    },

                                    ativo: {
                                        type: "boolean",
                                        example: true
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
                    description: "Usuário não encontrado."
                },

                500: {
                    description: "Erro interno do servidor."
                }

            }

        },
                patch: {

            tags: ["Usuários"],

            summary: "Atualizar usuário",

            description: "Atualiza parcialmente os dados de um usuário.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [

                {

                    name: "id_usuario",

                    in: "path",

                    required: true,

                    schema: {

                        type: "integer"

                    },

                    description: "ID do usuário.",

                    example: 1

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
                                    example: "Maria Souza"
                                },

                                email: {
                                    type: "string",
                                    example: "maria@gmail.com"
                                },

                                senha: {
                                    type: "string",
                                    example: "novaSenha123"
                                }

                            }

                        }

                    }

                }

            },

            responses: {

                200: {

                    description: "Usuário atualizado com sucesso."

                },

                400: {

                    description: "Nenhum campo informado para atualização."

                },

                401: {

                    description: "Token não fornecido."

                },

                403: {

                    description: "Token inválido ou expirado."

                },

                404: {

                    description: "Usuário não encontrado."

                },

                500: {

                    description: "Erro interno do servidor."

                }

            }

        },
        delete: {

            tags: ["Usuários"],

            summary: "Desativar usuário",

            description: "Realiza a exclusão lógica do usuário, alterando o campo ativo para FALSE.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [

                {

                    name: "id_usuario",

                    in: "path",

                    required: true,

                    schema: {

                        type: "integer"

                    },

                    description: "ID do usuário.",

                    example: 1

                }

            ],

            responses: {

                200: {

                    description: "Usuário desativado com sucesso."

                },

                401: {

                    description: "Token não fornecido."

                },

                403: {

                    description: "Token inválido ou expirado."

                },

                404: {

                    description: "Usuário não encontrado."

                },

                500: {

                    description: "Erro interno do servidor."

                }

            }

        }

    }
};

export default usuarios;