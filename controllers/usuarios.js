const {check, validationResult} = require('express-validator')
const UsuariosValid = require('../validators/Usuarios')

const usuarios = (app) => {

    // Rota para atender as requisições, ou seja, resposta para as requisições feitas com a url / (raiz)
    app.get('/', (req, res)=>{
        res.send('Root Rote Node')
    })

    // Rota para atender as requisições, ou seja, resposta para as requisições feitas com a url /usuarios
    app.get('/usuarios', (req, res) => {
        const usuarioDAO = app.models.Usuarios

        usuarioDAO.lista()
            .then(lista => {
                res.send(lista)
            }).catch(erro => {
                console.log(erro)
                res.status(500).send(erro)
            })
    })

    app.post('/usuarios',
        UsuariosValid.validacoes()
        ,(req, res) => {
        let usuario = req.body
        
        const erros = validationResult(req)

        if(!erros.isEmpty()){
            res.status(400).send(erros)
            return
        }
        
        const usuariosDAO = app.models.Usuarios

        usuariosDAO.inserir(usuario)
            .then(retorno => res.status(201).send(retorno))
            .catch(erro => {
                console.log(erro)
                res.status(500).send(erro)
        })
    })

    app.get('/usuarios/email/:email', (req, res) => {
        const email = req.params.email

        const usuariooDAO = app.models.Usuarios

        usuariooDAO.buscarPorEmail(email)
            .then(retorno => {
                if(retorno){
                    res.send(retorno)
                }else{
                    res.status(404).send()
                }
                res.send(retorno)
            })
            .catch(erro => res.status(500).send(erro))
    })
}

// Exportando a rota para conseguir chamar em outro arquivo
module.exports = usuarios