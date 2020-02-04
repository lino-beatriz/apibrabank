const {check, validationResult} = require('express-validator')
const UsuariosValid = require('../../validators/Usuarios')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const auth = require('../../config/auth')

gerarToken = (params) => jwt.sign({ params }, auth.secret, { expiresIn: 60 })

const autenticacao = (app) => {
    app.post('/registrar', UsuariosValid.validacoes()
    ,(req, res) => {
    let usuario = req.body
    
    const erros = validationResult(req)

    if(!erros.isEmpty()){
        res.status(400).send(erros)
        return
    }

    /** CRIPTOGRAFIA DE SENHA */
    // recebe o campo que deseja ser criptografado, um salto
    bcrypt.hash(usuario.senha, 10, (erro, hash) => {
        usuario.senha = hash

        const usuariosDAO = app.models.Usuarios

        usuariosDAO.inserir(usuario)
            .then(retorno => {
                /* deleta o campo senha da resposta em json (retorno) */
                delete retorno.senha
                res.status(201).send({
                    retorno,
                    token: gerarToken({id: retorno.id})
                })
            }) 
            .catch(erro => {
                console.log(erro)
                res.status(500).send(erro)
            })
    })
})


    app.post('/autenticar', async (req, res) => {
        const { email, senha } = req.body

        usuariosDAO = app.models.Usuarios

        const usuario = await usuariosDAO.buscarPorEmail(email)

        if(!usuario)
            return res.status(401)
                .send({erro: 'Usuário e/ou senha inválidos'})

        if(!await bcrypt.compare(senha, usuario.senha))
            return res.status(401)
                .send({erro: 'Usuário e/ou senha inválidos'})

        delete usuario.senha

        res.send({
            usuario, 
            token: gerarToken({id: usuario.id})
        })        
    })
}

module.exports = autenticacao


/* EXEMPLO DE AUTENTICAR SEM O async /
// usuariosDAO.buscarPorEmail(email)
        //     .then(usuario => {
        //         if(!usuario)
        //             return res.status(401).send({erro: 'Usuário e/ou senha inválidos'})

        //         bcrypt.compare(senha, usuario.senha, (erro, resultado) => {
        //             if(!resultado)
        //                 return res.status(401).send({erro: 'Usuário e/ou senha inválidos'})

        //              const token = jwt.sign({ id: usuario.id }, auth.secret, {
        //                 /** Options, expiresIn tempo em segundos que o token será valido */
        //                 expiresIn: 60
        //             })

        //             delete usuario.senha
        //             res.send({usuario, token})
        //         })
        //     })