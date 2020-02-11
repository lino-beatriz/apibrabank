const router = require('express').Router()
const categoriasCtrl = require('../controllers/categorias')

router.get('/', categoriasCtrl.lista)
router.post('/', categoriasCtrl.insere)

module.exports = router