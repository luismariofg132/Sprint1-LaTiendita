import { addProductoCar } from './script.js'

// pintar productos en ofertas
export const showOfertas = (ofertas) => {
    const oferta = document.getElementById('productOferta')
    oferta.innerHTML = ""
    ofertas.forEach(element => {
        const { id, nombre, precio, precioInicial, imagen } = element
        const porcentaje = 100;
        const descuento = Math.round(((precio - precioInicial) / precioInicial) * porcentaje);
        const product = document.createElement('div');
        product.innerHTML += `
        <span class="descuento">${descuento}%</span>
            <div class="product">
                <img src="${imagen}" alt="${nombre}">
                <div class="precio">&#36; ${precio}/Kg <span>&#36; ${precioInicial}/Kg</span></div>
                    <p>${nombre}</p>
            </div>
        <button class="btnAgregar" id="${id}">Ver más</button>
        `
        oferta.appendChild(product)
    });
}

// pintar productos populares
export const showPopulares = (populares) => {
    const popular = document.getElementById('productPopular')
    popular.innerHTML = ""
    populares.forEach(element => {
        const { id, nombre, precio, imagen } = element
        const product = document.createElement('div')
        product.innerHTML += `
        <img src="${imagen}" alt="${nombre}">
        <div class="precio">&#36; ${precio}/Kg</div>
        <p>${nombre}</p>
        <button class="btnAgregar" id="${id}">Ver más</button>
        `
        popular.appendChild(product)
    })
}

// Mostrar la informacion del producto en el modal
export const showModalProducto = (producto, api) => {
    const productModal = document.querySelector('.modal-producto-datos')
    productModal.innerHTML = ""
    const { nombre, precio, imagen } = producto
    let cantidad = 1;
    productModal.innerHTML += `
    <div class="imagen-product">
        <img src=${imagen}>
    </div>
        <div class="informacion-product">
            <span>${nombre}</span>
            <span>&#36; ${precio}</span>
            <p>Precios con IVA incluido</p>
            <div>
                <h5 class="cantidad">Selecciona la cantidad que deseas</h5>
                <div class="opciones-product">
                <div class="cantidad-product">
                    <button id="mas"><i class="bi bi-plus-lg"></i></button>
                    <h5 id="cantidad">${cantidad} Und</h5>
                    <button id="menos"><i class="bi bi-dash-lg"></i></button>
                </div>
                <div>
                    <button class="btnAgregarCar" id="btnAgregarCar">Agregar</button>
                </div>
            </div>
        </div>
    </div>
    `

    const cantidadProduct = document.getElementById('cantidad')

    const mas = document.getElementById('mas')
    const menos = document.getElementById('menos')

    mas.addEventListener('click', () => {
        cantidad++
        cantidadProduct.textContent = cantidad + " Und"
    })
    menos.addEventListener('click', () => {
        cantidad = cantidad - 1
        cantidadProduct.textContent = cantidad + " Und"
    })

    btnAgregarCar.addEventListener('click', () => {
        addProductoCar(api, cantidad)

        window.location.href = "#cerrar"

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Producto añadido al carrito',
            color: '#fff',
            background: '#0AC763'
        })
    })
}

// mostrar en productos del carrito de compras en el modal
export const showCarro = () => {
    let productosCar = JSON.parse(localStorage.getItem('ProductosCarro')) || []
    const productoComprar = document.getElementById('producto-car')
    if (productosCar == "") {
        productoComprar.innerHTML += `
        <div class="carritoVacio">
            <img src="https://res.cloudinary.com/ddgyxfetd/image/upload/v1642375611/Sprint%201/Family_Values_Shopping_kzkp7r.png">
            <h4>Tu canasta está vacía</h4>
        </div>
        `
    } else {
        productosCar.forEach(element => {
            const { id, nombre, imagen, cantidad, precioTotal } = element
            productoComprar.innerHTML += `
            <div class="producto">
                    <div class="info-producto">
                    <img src="${imagen}" alt="">
                <div>
                    <p>${nombre}</p>
                    <h4>&#36; ${precioTotal}</h4>
                </div>
                </div>
                <div class="cantidad">
                    <a id="${id}"><i class="bi bi-plus-lg"></i></a>
                    <h4 id="cantidad1">${cantidad} Und</h4>
                    <a id="${id}"><i class="bi bi-dash-lg"></i></a>
                </div>
            </div>
            `
        })
    }

    // productosCar.innerHTML = ""


    let total = productosCar.reduce((sum, value) => (typeof value.precioTotal == "number" ? sum + value.precioTotal : sum), 0)

    pago.textContent = `Ir a pagar $ ${total}`
}

