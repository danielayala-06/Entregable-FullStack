const API_URL = 'http://localhost:3000/api/cursos';
const API_URL_DOCENTES = 'http://localhost:3000/api/docentes';
const API_URL_SUBCATEGORIAS = 'http://localhost:3000/api/subcategorias';
const API_URL_CATEGORIAS = 'http://localhost:3000/api/categorias';

// Elementos del DOM
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');
const form = document.getElementById('form');
const formCategoria = document.getElementById('form-categoria');

const idCurso = document.getElementById('idCurso');
const categoria = document.getElementById('selectCategoria');
const subCategoria = document.getElementById('selectSubCategoria');
const docente = document.getElementById('selectDocente');
const titulo = document.getElementById('inputTitulo');
const descripcion = document.getElementById('textDescripcion');
const fechaInicio = document.getElementById('inputInicio');
const fechaFin = document.getElementById('inputFin');
const duracion = document.getElementById('inputDuracion');
const precio = document.getElementById('inputPrecio');

const datosTabla = document.querySelector("#tabla tbody");

// Event listeners
btnCancelar.addEventListener('click', () => {
    btnGuardar.innerText = 'Guardar';
    form.reset();
    idCurso.value = '';
});

formCategoria.addEventListener('submit', (e) => {
    e.preventDefault();
    // Limpiar opciones anteriores antes de cargar nuevas subcategorías
    subCategoria.innerHTML = '';
    subCategoria.disabled = false;
    getSubCategorias(categoria.value);
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        subcategoria: parseInt(subCategoria.value),
        docente: parseInt(docente.value),
        titulo: titulo.value,
        descripcion: descripcion.value,
        fecha_inicio: fechaInicio.value,
        fecha_fin: fechaFin.value,
        duracion: parseInt(duracion.value),
        precio: parseFloat(precio.value)
    };

    try {
        let response;
        if (idCurso.value === '') {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        } else {
            response = await fetch(`${API_URL}/${idCurso.value}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        }

        const result = await response.json();

        if (!response.ok) {
            console.error(result);
            return;
        }

        btnGuardar.innerText = 'Guardar';
        form.reset();
        idCurso.value = '';
        subCategoria.disabled = true;
        getCourses();
    } catch (error) {
        console.error(error);
    }
});

// Funciones async para obtener datos

async function getCourses() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener cursos');
        const cursos = await response.json();

        datosTabla.innerHTML = ''; // Limpiar tabla

        if (cursos.length === 0) {
            console.log('No se encontraron cursos');
            return;
        }

        cursos.forEach(curso => {
            const row = datosTabla.insertRow();

            const fecha_inicio = new Date(curso.fecha_inicio);
            const fecha_fin = new Date(curso.fecha_fin);

            row.insertCell().textContent = curso.id;
            row.insertCell().textContent = curso.subcategoria;
            row.insertCell().textContent = curso.docente;
            row.insertCell().textContent = curso.titulo;
            row.insertCell().textContent = curso.descripcion;
            row.insertCell().textContent = fecha_inicio.toLocaleDateString();
            row.insertCell().textContent = fecha_fin.toLocaleDateString();
            row.insertCell().textContent = curso.duracion;
            row.insertCell().textContent = curso.precio;

            const actionCell = row.insertCell();

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.classList.add('btn', 'btn-sm', 'btn-danger', 'mx-1', 'mb-2');
            btnEliminar.onclick = () => deleteCourse(curso.id, curso.titulo);

            const btnEditar = document.createElement("button");
            btnEditar.textContent = 'Editar';
            btnEditar.classList.add('btn', 'btn-sm', 'btn-warning', 'mx-1', 'px-3');
            btnEditar.onclick = () => loadDataCourse(curso);

            actionCell.appendChild(btnEliminar);
            actionCell.appendChild(btnEditar);
        });

    } catch (error) {
        console.error(error);
    }
}

async function getDocentes() {
    try {
        const response = await fetch(API_URL_DOCENTES);
        if (!response.ok) throw new Error('Error al obtener docentes');
        const docentes = await response.json();

        docente.innerHTML = ''; // Limpiar select docentes

        if (docentes.length === 0) {
            console.log('No se encontraron docentes');
            return;
        }

        docentes.forEach(doc => {
            const opt = document.createElement("option");
            opt.value = doc.id;
            opt.textContent = doc.fullName;
            docente.appendChild(opt);
        });
    } catch (error) {
        console.error(error);
    }
}

async function getSubCategorias(categoriaId) {
    try {
        const response = await fetch(`${API_URL_SUBCATEGORIAS}/${categoriaId}`);
        if (!response.ok) throw new Error('Error al obtener subcategorias');
        const subCategorias = await response.json();

        subCategoria.innerHTML = ''; // Limpiar select subcategorias

        if (subCategorias.length === 0) {
            console.log('No se encontraron subcategorias');
            subCategoria.disabled = true;
            return;
        }

        subCategorias.forEach(subCat => {
            const opt = document.createElement("option");
            opt.value = subCat.id;
            opt.textContent = subCat.titulo;
            subCategoria.appendChild(opt);
        });

        subCategoria.disabled = false;
    } catch (error) {
        console.error(error);
        subCategoria.disabled = true;
    }
}

async function getCategorias() {
    try {
        const response = await fetch(API_URL_CATEGORIAS);
        if (!response.ok) throw new Error('Error al obtener categorias');
        const categorias = await response.json();

        categoria.innerHTML = ''; // Limpiar select categorias

        if (categorias.length === 0) {
            console.log('No se encontraron categorias');
            return;
        }

        categorias.forEach(cat => {
            const opt = document.createElement("option");
            opt.value = cat.id;
            opt.textContent = cat.titulo;
            categoria.appendChild(opt);
        });

        // Deshabilitar selectSubCategoria hasta que se seleccione categoría
        subCategoria.disabled = true;
    } catch (error) {
        console.error(error);
    }
}

// Funciones para la carga de las fk
function loadDataCourse(curso) {
    const fecha_inicio = new Date(curso.fecha_inicio);
    const fecha_fin = new Date(curso.fecha_fin);

    idCurso.value = curso.id;
    categoria.value = curso.categoria;
    subCategoria.value = curso.sub_categoria;
    docente.value = curso.docente;
    titulo.value = curso.titulo;
    descripcion.value = curso.descripcion;
    fechaInicio.value = fecha_inicio.toISOString().split('T')[0];
    fechaFin.value = fecha_fin.toISOString().split('T')[0];
    duracion.value = curso.duracion;
    precio.value = curso.precio;

    btnGuardar.innerText = 'Actualizar';
    subCategoria.disabled = false;
}

async function deleteCourse(id, titulo) {
    if (!confirm(`¿Estás seguro de eliminar el curso: ${titulo}?`)) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`No se pudo eliminar el curso: ${titulo}`);

        getCourses();
    } catch (error) {
        console.error(error);
    }
}

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    getCategorias();
    getDocentes();
    getCourses();
});