const express = require('express')

//Para desplegar el FRONT-END
const cors = require('cors') //Permisos sobre el contenido a desplegar
const path = require('path') //Express servir el frontend


//LLamamos al enrutador
const cursoRoutes = require('./routes/cursoRoutes')
const docenteRoutes = require('./routes/docenteRoutes')
const subCategoriaRoutes = require('./routes/subcategoriaRoutes')

const app = express()
const PORT = process.env.PORT || 3000 

//Permisos cors
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))


// *** MIDDLEWARE ***
//La comunicación se realizará JSON
app.use(express.json())

//Servir los documentos HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')))

//*** RUTEOS PARA EL FRONT END ***/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Rutas API
app.use('/api/cursos', cursoRoutes)
app.use('/api/docentes', docenteRoutes)
app.use('/api/subcategorias', subCategoriaRoutes)


//Iniciamos el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor iniciado http://localhost:${PORT}`)
})