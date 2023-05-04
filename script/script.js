const API_OFERTAS = 'https://la-tiendita-bk.lfrancodev.com/ofertas/'
const API_POPULARES = 'https://la-tiendita-bk.lfrancodev.com/populares/'
const API_UBICACIONES = 'https://la-tiendita-bk.lfrancodev.com/uicaciones/'
let productosCar = JSON.parse(localStorage.getItem('ProductosCarro')) || []
let LSUbicacion = JSON.parse(localStorage.getItem('ubicacion')) || ""
const productoComprar = document.getElementById('producto-car')
const oferta = document.getElementById('productOferta')
const popular = document.getElementById('productPopular')
const select = document.getElementById('select-ubi')
const fragmentSelect = document.createDocumentFragment()
const btnUbicacion = document.getElementById('btnUbicacion')
const ubicacionModal = document.getElementById('ubicacion-modal')
const ubicacion = document.getElementById('ubicación')
const productModal = document.querySelector('.modal-producto-datos')
import getProducts from './getProducts.js'
import { showOfertas } from './showProdutcs.js'
import { showPopulares } from './showProdutcs.js'
import { showCarro } from './showProdutcs.js'
import { showModalProducto } from './showProdutcs.js'

document.addEventListener('DOMContentLoaded', async () => {
    const ofertas = await getProducts(API_OFERTAS)
    showOfertas(ofertas)

    const populares = await getProducts(API_POPULARES)
    showPopulares(populares)

    showCarro();
    const ubicaciones = await getProducts(API_UBICACIONES)
    showUbicaiones(ubicaciones)

    if (LSUbicacion == "") {
        window.location.href = "#modal-ubicacion"
    }

    else {
        ubicacion.textContent = LSUbicacion.ciudad
        ubicacionModal.textContent = LSUbicacion.ciudad
    }
})

export const addProductoCar = async (api, cantidad1) => {
    const producto = await getProducts(api)

    const { id, nombre, precio, imagen } = producto
    let precioTotal = precio * cantidad1
    precioTotal = precioTotal.toFixed(2)
    const Producto = {
        id: id,
        nombre: nombre,
        precio: precio,
        precioTotal: Number(precioTotal),
        imagen: imagen,
        cantidad: cantidad1,
        api: api
    }

    productosCar.unshift(Producto)
    localStorage.setItem('ProductosCarro', JSON.stringify(productosCar))
}

const showUbicaiones = (ubicaciones) => {
    ubicaciones.forEach(element => {
        const { id, ciudad } = element
        const option = document.createElement('option')
        option.setAttribute('value', id)
        option.textContent = ciudad
        fragmentSelect.appendChild(option)
    })

    select.appendChild(fragmentSelect)
}

btnUbicacion.addEventListener('click', () => {
    let ubicacion = document.getElementById('select-ubi')
    let ubicacionSelect = ubicacion.options[ubicacion.selectedIndex].value;

    if (ubicacionSelect == 0) {
        window.location.href = "#cerrar"
    }
    else {
        guardarUbicacion(ubicacionSelect)
        window.location.href = "#cerrar"
    }
})

const guardarUbicacion = async (indexUbicacion) => {
    const busq = await fetch(API_UBICACIONES + indexUbicacion)
    const resp = await busq.json()

    localStorage.setItem('ubicacion', JSON.stringify(resp))
    window.location.reload()
}

oferta.addEventListener('click', async (e) => {
    const Agrear = e.target.classList.contains('btnAgregar')
    const id = e.target.id

    if (Agrear) {
        const showOferta = await getProducts(API_OFERTAS + id)
        showModalProducto(showOferta, API_OFERTAS + id)
        window.location.href = "#modal-producto"
    }

})

popular.addEventListener('click', async (e) => {
    const Agregar = e.target.classList.contains('btnAgregar')
    const id = e.target.id

    if (Agregar) {
        const showOferta = await getProducts(API_POPULARES + id)
        showModalProducto(showOferta, API_POPULARES + id)
        window.location.href = "#modal-producto"
    }

})



