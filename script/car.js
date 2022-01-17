const btnVolver = document.getElementById('volver')
const btnPago = document.getElementById('pagoTotal')

document.addEventListener('DOMContentLoaded', () => {
    showProductCompra()
})

btnVolver.addEventListener('click', () => {
    window.location.href = "index.html"
})

const showProductCompra = () => {
    let productosCar = JSON.parse(localStorage.getItem('ProductosCarro')) || []
    const productosCarrito = document.querySelector('.productosCarrito')
    productosCarrito.innerHTML = ""
    productosCar.forEach(element => {
        const { cantidad, imagen, nombre, precioTotal } = element
        productosCarrito.innerHTML += `
        <div class="infoProductoCarP2">
                <div class="infoProductoP2">
                    <img src="${imagen}" alt="">        
                    <div>
                        <p>${nombre}</p>
                        <h4>&#36; ${precioTotal}</h4>
                    </div>
                </div>
            <div class="cantidadP2">
                <a><i class="bi bi-plus-lg"></i></a>
                <h4>${cantidad} Und</h4>
                <a><i class="bi bi-dash-lg"></i></a>
            </div>
        </div>
        `
    })

    let total = productosCar.reduce((sum, value) => (typeof value.precioTotal == "number" ? sum + value.precioTotal : sum), 0)
    btnPago.textContent = "Pagar $" + total
}

btnPago.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const numberCard = document.getElementById('numberCard').value
    const expirationDate = document.getElementById('expirationDate').value
    const cvc = document.getElementById('cvc').value
    const nameCard = document.getElementById('nameCard').value
    const formPago = document.getElementById('formPago')

    if (email == "" || numberCard.length !== 16 || numberCard == "" || expirationDate.length !== 4 || expirationDate == "" || cvc.length !== 3 || cvc == "" || nameCard == "") {
        error()
    }

    else {
        const lastPay = {
            email,
            nameCard
        }

        localStorage.setItem('lastPay', JSON.stringify(lastPay))
        localStorage.removeItem('ProductosCarro')
        formPago.reset()
        Swal.fire({
            title: 'Gracias por tu compra',
            imageUrl: 'https://res.cloudinary.com/ddgyxfetd/image/upload/v1642380208/Sprint%201/Hands_Buying_xmchlh.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#0AC763',
            confirmButtonText: 'Seguir comprando'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "index.html"
            }
        })

    }

})

const error = () => {
    Swal.fire({
        text: 'Verifique los datos ingresados',
        confirmButtonColor: '#0AC763'
    })
}