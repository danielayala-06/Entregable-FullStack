const express = require('express')

//LLamamos al enrutador
const cursoRoutes = require('./routes/cursoRoutes')

const app = express()
const PORT = process.env.PORT || 3000 

// *** MIDDLEWARE ***
//La comunicación se realizará JSON
app.use(express.json())

//Rutas API
app.use('/api/cursos', cursoRoutes)


//Iniciamos el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor iniciado http://localhost:${PORT}`)
})