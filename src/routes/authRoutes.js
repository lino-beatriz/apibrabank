const router = require('express').Router()
const authCtrl = require('../controllers/public/autenticacao')
const usuarioValidator = require('../validators/Usuarios')

router.post('/registrar', usuarioValidator.validacoes(), authCtrl.registra)
router.post('/autenticar', authCtrl.autentica)

module.exports = router
