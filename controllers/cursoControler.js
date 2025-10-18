//Accedemos a la BD:mysql/promise
const db = require('../config/db')

exports.getAllCourses = async(req , res)=>{
    //1. Preparamos la consulta
    const sql = 'SELECT * FROM cursos'
    
    //Validaciones

    try {
        //2.Ejecutamos la consulta
        const [result] = await db.query(sql) 
        
        res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({error: e})
    }
}

exports.createCurso = async (req, res)=> {
    if (!req.body) {
        return res.status(400).json({ error: 'No se recibieron datos en el cuerpo de la solicitud.' });
    }

    const {subcategoria, docente, titulo, descripcion, fecha_inicio, fecha_fin, duracion} = req.body

    const sql = "INSERT INTO cursos(subcategoria, docente, titulo, descripcion, fecha_inicio, fecha_fin, duracion) VALUES(?,?,?,?,?,?,?)"
    
    //Validaciones

    try {
        const [result] = await db.query(sql,[subcategoria, docente, titulo, descripcion, fecha_inicio, fecha_fin, duracion])

        if(subcategoria === undefined){
            return res.status(400).json({mensaje: 'subcategoria no puede ser undefined'})
        }

        return res.status(200).json({
            mensaje: 'Registrado correctamente',
            pk: result.insertId
        })

    } catch (e) {
        console.error(e)
        return res.status(500).json({error: e})
    }
}

exports.editCurso = async (req, res) => {
    //Obtenemos el id del usuario a editar
    const {id} = req.params

    //Obtenemos los nuevos valores para los campos
    const {subcategoria, docente, titulo, descripcion, fecha_fin, fecha_inicio, duracion} = req.body

    //Preparamos el sql
    const SQL = 'UPDATE cursos SET subcategoria=?, docente=?, titulo=?, descripcion=?, fecha_fin=?, fecha_inicio=?, duracion=? WHERE id =?'

    try {
        const [resut] = await db.query(SQL,[subcategoria, docente, titulo, descripcion, fecha_fin, fecha_inicio, duracion, id])
        if(resut.affectedRows === 0){
            return res(402).json({mensaje: 'No se encontro el curso a actualizar'})
        }
        return res.status(200).json({mensaje: `Se actualizo: ${resut.affectedRows} registros`})

    } catch (e) {
        console.error(e)
        return res.status(500).json({error: e})
    }
}

exports.deleteCurso = async(req, res) => {
    const {id} = req.params
    
    //SQL 
    const SQL = 'DELETE FROM cursos WHERE id = ?'

    try {
        const [result] = await db.query(SQL, [id])
        if(result.affectedRows === 0){
            return res.status(402).json({
                mensaje: `No se encontro el registro con el id ${id}`
            })
        }
        return res.status(200).json({mensaje: `se elimino el registro con el id ${id}`})

    } catch (e) {
        console.error(e)
        return res.staus(500).json({
            error: e
        })
    }


}