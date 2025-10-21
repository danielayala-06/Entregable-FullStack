//Accedemos a la BD:mysql/promise
const db = require('../config/db')

exports.getAllSubCategorias = async (req, res)=> {
    const sql = 'SELECT * FROM sub_categorias'

    try {
       const [result] = await db.query(sql)
       
        if(!result){
            return res.status(404).json({mensaje: 'No se encontraron registros'})
        }

        return res.status(200).json(result)

    } catch (e) {
        return res.status(500).json({error:e})
    }
}
exports.getSubCategoriasByCategoria = async (req, res)=> {
    const {id} = req.params
    
    const sql = 'SELECT * FROM sub_categorias WHERE categoria = ?'
    
    try {
        const [result] = await db.query(sql,[id])

        if(!result){return res.status(404).json({mensaje: 'No se encontraron registros'})}
        if(result.length ===0){return res.status(404).json({mensaje: 'No se encontraron registros'})}

        return res.status(200).json(result)

    } catch (e) {
        return res.status(500).json({error:e})
    }
    
}