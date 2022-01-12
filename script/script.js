const API_OFERTAS = 'https://peaceful-ocean-61738.herokuapp.com/ofertas/'
const API_POPULARES = 'https://peaceful-ocean-61738.herokuapp.com/populares/'
const API_UBICACIONES = 'https://peaceful-ocean-61738.herokuapp.com/uicaciones/'
let productosCar = JSON.parse(localStorage.getItem('ProductosCarro')) || []
let LSUbicacion = JSON.parse(localStorage.getItem('ubicacion')) || ""
const productoComprar = document.getElementById('producto-car')
const oferta = document.getElementById('productOferta')
const popular = document.getElementById('productPopular')
const select = document.getElementById('select-ubi')
const pago = document.getElementById('pago')
const fragmentSelect = document.createDocumentFragment()
const btnUbicacion = document.getElementById('btnUbicacion')
const ubicacionModal = document.getElementById('ubicacion-modal')

document.addEventListener('DOMContentLoaded', () => {
    getOfertas(API_OFERTAS)
    getPopulares(API_POPULARES)
    showCarro();
    getUbicaciones(API_UBICACIONES)
    if (LSUbicacion == "") {
        window.location.href = "#modal-ubicacion"
    }

    else {
        ubicacion.textContent = LSUbicacion.ciudad
        ubicacionModal.textContent = LSUbicacion.ciudad
    }
})


const getOfertas = async (ofertas) => {
    const busq = await fetch(ofertas)
    const data = await busq.json()

    showOfertas(data)
}

const getPopulares = async (populares) => {
    const busq = await fetch(populares)
    const data = await busq.json()

    showPopulares(data)
}

const getUbicaciones = async (ubicaciones) => {
    const busq = await fetch(ubicaciones)
    const data = await busq.json()

    showUbicaiones(data)
}

const showOfertas = (ofertas) => {
    oferta.innerHTML = ""
    ofertas.forEach(element => {
        const { id, nombre, precioFinal, precioInicial, imagen } = element
        const porcentaje = 100;
        const descuento = Math.round(((precioFinal - precioInicial) / precioInicial) * porcentaje);
        const product = document.createElement('div');
        product.innerHTML += `
        <span class="descuento">${descuento}%</span>
            <div class="product">
                <img src="${imagen}" alt="${nombre}">
                <div class="precio">&#36; ${precioFinal}/Kg <span>&#36; ${precioInicial}/Kg</span></div>
                    <p>${nombre}</p>
            </div>
        <button class="btnAgregar" onclick="addOferta(${id})">Ver más</button>
        `
        oferta.appendChild(product)
    });
}

const showPopulares = (populares) => {
    popular.innerHTML = ""
    populares.forEach(element => {
        const { id, nombre, precio, imagen } = element
        const product = document.createElement('div')
        product.innerHTML += `
        <img src="${imagen}" alt="${nombre}">
        <div class="precio">&#36; ${precio}/Kg</div>
        <p>${nombre}</p>
        <button class="btnAgregar" onclick="addPopular(${id})">Ver más</button>
        `
        popular.appendChild(product)
    })
}

const addOferta = async (idP) => {
    const busq = await fetch(API_OFERTAS)
    const data = await busq.json()

    busqProducto = data.find(product => product.id == idP)
    const { id, nombre, precioFinal, imagen } = busqProducto

    const Producto = {
        id: id,
        nombre: nombre,
        precio: precioFinal,
        imagen: imagen,
        cantidad: 1
    }

    productosCar.unshift(Producto)
    localStorage.setItem('ProductosCarro', JSON.stringify(productosCar))
}

const addPopular = async (idP) => {
    const busq = await fetch(API_POPULARES)
    const data = await busq.json()

    busqProducto = data.find(product => product.id == idP)
    const { id, nombre, precio, imagen } = busqProducto

    const Producto = {
        id: id,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1
    }

    productosCar.unshift(Producto)
    localStorage.setItem('ProductosCarro', JSON.stringify(productosCar))
}

const showCarro = () => {
    productosCar.innerHTML = ""
    productosCar.forEach(element => {
        const { id, nombre, precio, imagen } = element
        productoComprar.innerHTML += `
        <div class="producto">
                <div class="info-producto">
                <img src="${imagen}" alt="">
            <div>
                <p>${nombre}</p>
                <h4>&#36; ${precio}</h4>
            </div>
            </div>
            <div class="cantidad">
                <a class="operador"><i class="bi bi-plus-lg"></i></a>
                <h4>250 g</h4>
                <a class="operador"><i class="bi bi-dash-lg"></i></a>
            </div>
        </div>
        `
    })
    let total = productosCar.reduce((sum, value) => (typeof value.precio == "number" ? sum + value.precio : sum), 0)
    pago.textContent = `Ir a pagar $ ${total}`
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

