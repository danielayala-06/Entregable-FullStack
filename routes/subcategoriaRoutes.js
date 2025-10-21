const express = require('express')

//Llamamos a un enrutador
const router = express.Router()

//Obtenemos los objetos exportados en el controlador
const subCategoriaController = require('../controllers/subcategoriaController')

//Definimos las rutas
router.get('/', subCategoriaController.getAllSubCategorias)
router.get('/:id', subCategoriaController.getSubCategoriasByCategoria)

module.exports = router