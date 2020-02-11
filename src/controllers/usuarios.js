const {check, validationResult} = require('express-validator')
const UsuariosValid = require('../validators/Usuarios')
const usuarioDAO = new (require('../models/Usuarios'))()

module.exports = {
    async lista(req, res){
        try{
            const usuarios = await usuarioDAO.lista()
            if(!usuarios)
                res.status(404).send({erro: 'Lista vazia'})

            res.send(usuarios)
        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    },

    async insere(req, res){
        const erros = validationResult(req)

        if(!erros.isEmpty()){
            res.status(400).send(erros)
            return
        }

        let usuario = req.body

        try{
            const retorno = await usuarioDAO.inserir(usuario)
            usuario = {id: retorno.insertId, ...usuario}
            res.status(201).send(usuario)
        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    }
}
