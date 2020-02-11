const jwt = require('jsonwebtoken')
const auth = require('../config/auth')

module.exports = async (req,res,next) => {
        const authHeader = req.headers.authorization 
    
        // Verifica se tem autorização no header
        if(!authHeader)
        return res.status(401).send({erro: 'Token não informado'})
    
        const parts = authHeader.split(' ')
    
        // Verifica se a aturotização tem duas partes
        if(parts.length !== 2)
            return res.status(401).send({erro: 'Erro no token'})
    
        const [ bearer, token ] = parts
    
        /* Verificando se o bearer é realmente um barer, ou seja se o token esta bem formatado*/ 
        // Verifica se a priemra parte tem o Bearer
        if(!/^Bearer$/i.test(bearer))
            return res.status(401).send({erro: 'Token mal formatado'})
    
        // Verifica se o token é valido
        try{
            const decoded = await jwt.verify(token, auth.secret)
    
            req.userId = decoded.id
    
            return next()
        }catch(erro){
            res.status(401).send({erro: 'Token inválido'})
        }
    }
