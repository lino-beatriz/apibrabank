const { check, validationResult } = require('express-validator')
const UsuariosValid = require('../../validators/Usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../config/auth')
const usuariosDAO = new (require('../../models/Usuarios'))()

gerarToken = (params) => jwt.sign({ params }, auth.secret, { expiresIn: 60 })

module.exports = {
    async registra(req, res) {
        const erros = validationResult(req)

        if (!erros.isEmpty())
            return res.status(400).send(erros)

        let usuario = req.body

        try {
            const hash = await bcrypt.hash(usuario.senha, 10)

            usuario.senha = hash

            const resultado = await usuariosDAO.inserir(usuario)

            usuario = { id: resultado.insertId, ...usuario }

            res.status(201).send({
                usuario,
                token: gerarToken({ id: usuario.id })
            })
        } catch (erro) {
            console.log(erro)
            res.status(500).send(erro)
        }
    },

    async autentica(req, res) {
        const { email, senha } = req.body

        try {
            let usuario = await usuariosDAO.buscarPorEmail(email)

            usuario = usuario[0]

            if (!usuario)
                return res.status(401)
                    .send({ erro: 'Usuário e/ou senha inválidos' })

            if (!await bcrypt.compare(senha, usuario.senha))
                return res.status(401)
                    .send({ erro: 'Usuário e/ou senha inválidos' })

            delete usuario.senha

            res.send({
                usuario,
                token: gerarToken({ id: usuario.id })
            })
        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }

        
    }
}


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