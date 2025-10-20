const express = require('express')

//Llamamos a un enrutador
const router = express.Router()

//Obtenemos los objetos exportados en el controlador
const cursoController = require('../controllers/cursoControler')

//Definimos las rutas
router.get('/', cursoController.getAllCourses)
router.get('/:id', cursoController.getCourseById)
router.post('/', cursoController.createCurso)
router.put('/:id', cursoController.editCurso)
router.delete('/:id', cursoController.deleteCurso)

module.exports = router