// Importação do express
const express = require('express')

// Invocação do express dentro da constante app
const app = express()

// Importacao do consign
const consign = require('consign')

/* Importacao do body parser, caso for usado, ele deve ser chamado em app.use(express.json())
const bodyParser = require('body-parser')
*/

customExpress = () => {

    app.use(express.json())

    // Incluindo todos os arquivos que esta na pasta controllers dentro da const 'app'
    consign()
        .include('controllers/public')
        .then('middlewares')
        .then('controllers')
        .then('models')
        .into(app)  

        return app
}

module.exports = customExpress() 


/******************** EXEMPLOS ************************* */

/* Importando a rota de usuarios que esta dentro da pasta de controller -- Exemplo de importação indivudual de um arquivo
const usuarioController = require('./controllers/usuarios')

// Invocando a rota de usuarios
usuarioController(app)*/
