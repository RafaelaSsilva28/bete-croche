import jwt from 'jsonwebtoken'

//ASSINATURA DO MEU SERVIDOR SO O SERVIDOR TEM ESSA CHAVE
const SECRET_KEY = 'sua_chave_secreta'


export function autenticarToken(req, res, next){  //next passando para proxima etapa
    const cabecalho = req.headers['authorization']

    //extrair o token, que por padrão vem no formato BEARER
    //BEARER isdsidsjsdjsddjs
    const token = cabecalho && cabecalho.split(' ')[1]  //função split para cair o servidor

    //validação se o token esta autorizado.
    if(! token){
        return res.status(401).json({message: 'Token não fornecido'})
    }

    //caso o token seja valido e se a assinatura for igual a secret_key ele permite o acesso
    jwt.verify(token, SECRET_KEY, (error, usuario) =>{ //verificando token
        //validando se o token é valido ou expirou
        if(error){
            return res.status(403).json({message: 'Token invalido ou expirado'})
        }

        req.usuario = usuario
        next() //passando para proxima função ou rota
    })
}