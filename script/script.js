const API_OFERTAS = 'http://localhost:4000/ofertas/'
const API_POPULARES = 'http://localhost:4000/populares/'
let productosCar = JSON.parse(localStorage.getItem('ProductosCarro')) || []
const productoComprar = document.getElementById('producto-car')
const oferta = document.getElementById('productOferta')
const popular = document.getElementById('productPopular')
const btnCar = document.getElementById('btnCar')
const vaciar = document.getElementById('vaciar')
const pago = document.getElementById('pago')

document.addEventListener('DOMContentLoaded', () => {
    getOfertas(API_OFERTAS)
    getPopulares(API_POPULARES)
    showCarro();
})

btnCar.addEventListener('click', () => {
    window.location.href = "#modal-car"
    window.location.reload()
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
        imagen: imagen
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
        imagen: imagen
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
    pago.innerHTML += `<p>Ir a pagar &#36; ${total}</p>`
}

vaciar.addEventListener('click', () => {
    localStorage.removeItem('ProductosCarro')
    window.location.reload()
})