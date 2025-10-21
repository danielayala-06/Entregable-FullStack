const express = require('express')

//Llamamos a un enrutador
const router = express.Router()

//Obtenemos los objetos exportados en el controlador
const categoriaController = require('../controllers/categoriaController')

//Definimos las rutas
router.get('/', categoriaController.getAllCategorias)
router.get('/:id', categoriaController.getCategoriasByID)

module.exports = router