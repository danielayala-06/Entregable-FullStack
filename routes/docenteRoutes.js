const express = require('express')

//Llamamos a un enrutador
const router = express.Router()

//Obtenemos los objetos exportados en el controlador
const docenteController = require('../controllers/docenteController')

//Definimos las rutas
router.get('/', docenteController.getAllDocentes)
router.get('/:id', docenteController.getDocenteByID)

module.exports = router