const API_URL = 'http://localhost:3000/api/cursos'
const API_URL_DOCENTES = 'http://localhost:3000/api/docentes'
const API_URL_SUBCATEGORIAS = 'http://localhost:3000/api/subcategorias'
const API_URL_CATEGORIAS = 'http://localhost:3000/api/categorias'

//botones
const btnGuardar = document.getElementById('btnGuardar')
const btnCancelar = document.getElementById('btnCancelar')
//Retorna el botón guardar a su estado original
btnCancelar.addEventListener('click', () => {
    btnGuardar.innerText = 'Guardar'
})

//Formulario
const form = document.getElementById('form')
//Datos
const idCurso = document.getElementById('idCurso').value
const subCategoria = document.getElementById('selectSubCategoria').value
const categoria = document.getElementById('selectCategoria').value
const docente = document.getElementById('selectDocente').value
const titulo = document.getElementById('inputTitulo').value
const descripcion = document.getElementById('textDescripcion').value
const fechaInicio = document.getElementById('inputInicio').value
const fechaFin = document.getElementById('inputFin').value
const duracion = document.getElementById('inputDuracion').value
const precio = document.getElementById('inputPrecio').value

//Select
const selectSubCategoria = document.querySelector('#selectSubCategoria')
const selectDocente = document.querySelector('#selectDocente')
const selectCategoria = document.querySelector('#selectCategoria')

//inputs fecha
const inputInicio = document.querySelector('#inputInicio')
const inputFin = document.querySelector('#inputFin')

//Tabla
const datosTabla = document.querySelector("#tabla tbody")

async function getCourses(){
    const response = await fetch(API_URL,{method: 'get'})
    
    if(!response.ok){
        console.error("Problemas en la conexion")
        return;
    }
    const cursos = await response.json()

    if(cursos.length === 0){
        console.log('No se encontraron personas')
    }
    //Verificamos que los datos estan llegando correctamente
    //console.log(cursos)

    cursos.forEach(curso => {
        const row = datosTabla.insertRow() //<tr>
        
        // Convertimos los datos recibidos por el JSON en tipo date para poder formatearlos
        // sin formatear=> 05-11-2025T05:00:00.000Z 
        // formateado=> 05/11/2025 
        const fecha_inicio = new Date(curso.fecha_inicio)
        const fecha_fin = new Date(curso.fecha_fin)

        row.insertCell().textContent = curso.id
        row.insertCell().textContent = curso.subcategoria
        row.insertCell().textContent = curso.docente
        row.insertCell().textContent = curso.titulo
        row.insertCell().textContent = curso.descripcion
        row.insertCell().textContent = fecha_inicio.toLocaleDateString()
        row.insertCell().textContent = fecha_fin.toLocaleDateString()
        row.insertCell().textContent = curso.duracion
        row.insertCell().textContent = curso.precio
        
        
        //console.log(`Soy el valor de fecha inicio:${yearinicio.toLocaleDateString()}`)

        const actionCell = row.insertCell()
        //Eliminar => botón (JS) => fetch() (Asíncrono)
        const btnEliminar = document.createElement("button")
        btnEliminar.textContent = 'Eliminar'
        btnEliminar.classList.add('btn', 'btn-sm', 'btn-danger', 'mx-1', 'mb-2')
        btnEliminar.onclick = ()=> eliminarCurso(persona)
        
        //Editar => enlace => se realizará en otra vista
        const btnEditar = document.createElement("button")
        btnEditar.textContent = 'Editar'
        btnEditar.classList.add('btn', 'btn-sm', 'btn-warning', 'mx-1', 'px-3')
        btnEditar.onclick = ()=> loadDataCourse(persona)

        
        //Agregamos el botón y el enlace a la nueva celda
        actionCell.appendChild(btnEliminar)
        actionCell.appendChild(btnEditar)
    });

}

//Funcion para obtener los docentes:
async function getDocentes() {
    const response = await fetch(API_URL_DOCENTES,{method: 'get'})
    
    if(!response.ok){
        console.error("Problemas en la conexion")
        return;
    }
    const docentes = await response.json()

    if(docentes.length === 0){
        console.log('No se encontraron docentes')
    }
    //Verificamos que los datos estan llegando correctamente
    //console.log(docentes)
    //Llenamos los option de docentes
    docentes.forEach(docente => {
        //Creamos el option
        const opt = document.createElement("option")
        opt.value = docente.id
        opt.textContent = docente.fullName
        selectDocente.appendChild(opt)
    });

    return docentes
}

//Funcion para obtener las subCategorias:
async function getSubCategorias() {
    const response = await fetch(API_URL_SUBCATEGORIAS,{method: 'get'})
    console.log(response)
    
    if(!response.ok){
        console.error("Problemas en la conexion")
        return;
    }
    const subCategorias = await response.json()

    if(subCategorias.length === 0){
        console.log('No se encontraron docentes')
    }
    //Verificamos que los datos estan llegando correctamente
    //console.log(typeof(subCategorias))

    //Insertamos los options
    subCategorias.forEach(subCategoria => {
        //Creamos el option
        const opt = document.createElement("option")
        opt.value = subCategoria.Id
        opt.textContent = subCategoria.titulo
        selectSubCategoria.appendChild(opt)
    });
    return subCategorias
}

//Funcion para obtener las categorias:
async function getCategorias(){
    const response = await fetch(API_URL_CATEGORIAS,{method: 'get'})
    console.log(response)
    
    if(!response.ok){
        console.error("Problemas en la conexion")
        return;
    }
    const categorias = await response.json()

    if(categorias.length === 0){
        console.log('No se encontraron docentes')
    }
    //Verificamos que los datos estan llegando correctamente
    console.log(categorias)

    //Insertamos los options
    categorias.forEach(categoria => {
        //Creamos el option
        const opt = document.createElement("option")
        opt.value = categoria.id
        opt.textContent = categoria.titulo
        selectCategoria.appendChild(opt)
    });
    return categorias
}

//Constante para obtener el Dia Actual:
/* 
const date = new Date()
const currentDate = date.toLocaleDateString()
console.log(currentDate.toLocaleDateString())
    */
async function loadDataCourse(curso){
    idCurso.value = curso.id
    subCategoria.value = curso.subcategoria
    docente.value = curso.docente
    titulo.value = curso.titulo
    descripcion.value = curso.descripcion
    fechaInicio.value = curso.fecha_inicio
    fechaFin.value = curso.fecha_fin
    duracion.value = curso.duracion
    precio.value = curso.precio
    btnGuardar.innerText = 'Actualizar'
}

//Insertamos los datos del formulario
form.addEventListener("submit", async(e)=>{
    e.preventDefault()//Anulamos el evento submit

    const data = {
        subcategoria: subcategoria,
        docente: docente,
        titulo: titulo,
        descripcion: descripcion,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        duracion: duracion,
        precio: precio
    }

    try {
        //Usamos una variable para ver si actualizamos o registramos
        let response = null
        
        if(idCurso.value === ''){
            //Crear
            response = await fetch(API_URL, {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
        }else{
            //Actualizamos
            response = await fetch(API_URL +`/${idCurso.value}`,{
                method: 'put',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
        }
        
        const result = await response.json()



    } catch (e) {
        console.error(e)
    }

}) 

document.addEventListener("DOMContentLoaded", ()=>{
    getCourses()
    getDocentes()
    getSubCategorias()
    getCategorias()
    //makeOptionsDocentes()
})