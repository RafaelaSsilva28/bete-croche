const login = {

    "/login": {

        post: {

            tags: ["Login"],

            summary: "Realizar login",

            description: "Autentica um usuário e retorna um token JWT.",

            security: [],

            requestBody: {

                required: true,

                content: {

                    "application/json": {

                        schema: {

                            type: "object",

                            required: ["email", "senha"],

                            properties: {

                                email: {
                                    type: "string",
                                    example: "admin@gmail.com"
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

                200: {

                    description: "Login realizado com sucesso.",

                    content: {

                        "application/json": {

                            schema: {

                                type: "object",

                                properties: {

                                    message: {
                                        type: "string",
                                        example: "Login realizado com sucesso."
                                    },

                                    token: {
                                        type: "string",
                                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                    }

                                }

                            }

                        }

                    }

                },

                400: {

                    description: "E-mail e senha são obrigatórios."

                },

                401: {

                    description: "E-mail ou senha inválidos."

                },

                500: {

                    description: "Erro interno do servidor."

                }

            }

        }

    }

};

export default login;