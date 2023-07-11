import { obtenerProducto, editarProducto } from "./api.js";
import { mostrarAlerta } from "./mostraAlerta.js";

const nombreInput = document.querySelector('#nombre');
const precioInput = document.querySelector('#precio');
const categoriaInput = document.querySelector('#categoria');
const idInput = document.querySelector('#id');


document.addEventListener('DOMContentLoaded', async ()=>{
    //consultar en la url para extraer y guardar el id que enviamos en la ruta 
    const parametrosURL = new URLSearchParams(window.location.search);
    const idProducto = parseInt(parametrosURL.get('id'));

   //console.log(idProducto)
   const producto = await obtenerProducto(idProducto)
   //console.log(parametrosURL)
   mostrarProducto(producto);

   //hacer el registro desde el formulario
   const formulario = document.querySelector('#formulario'); //idformulario 
   formulario.addEventListener('submit',validarProducto);
})

async function validarProducto(e){
    e.preventDefault();

    const producto ={
        nombre: nombreInput.value,
        precio: precioInput.value,
        categoria: categoriaInput.value,
        id: parseInt(idInput.value)

    }

    if(validar(producto)){
        //console.log('Todos los campos son obligatorios')
        mostrarAlerta('Todos los campos son obligatorios')
        return;
    }

    await editarProducto(producto);
    window.location.href = 'index.html';
}

function mostrarProducto(producto){
    //muestra los datos del producto en la interfaz de editar producto 
    const {nombre,precio,categoria,id} = producto;

    nombreInput.value = nombre;
    precioInput.value = precio;
    categoriaInput.value = categoria;
    idInput.value = id;
}

function validar(objeto){
    return !Object.values(objeto).every(element => element !== '')
}
