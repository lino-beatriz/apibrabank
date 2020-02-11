const express = require('express')
const app = express()
const auth = require('./routes/authRoutes')
const categoria = require('./routes/categoriaRoutes')
const authMid = require('./middlewares/auth')

app.use(express.json())

app.use('/', auth)

app.use(authMid)

app.use('/categorias', categoria)

module.exports = app