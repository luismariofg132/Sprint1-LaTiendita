const btnCar = document.getElementById('btnCar')
const vaciar = document.getElementById('vaciar')
const ubicacion = document.getElementById('ubicación')
const titulo = document.querySelector('.logo')
const pago = document.getElementById('pago')
const btnSettings = document.getElementById('btnSettings')


btnSettings.addEventListener('click', () => {
    window.location.href = "CRUD.html"
})

titulo.addEventListener('click', () => {
    window.location.href = "index.html"
})

btnCar.addEventListener('click', () => {
    window.location.href = "#modal-car"
    window.location.reload()
})

vaciar.addEventListener('click', () => {
    localStorage.removeItem('ProductosCarro')
    window.location.href = "index.html"
})

ubicacion.addEventListener('click', () => {
    window.location.href = "#modal-ubicacion"
})

pago.addEventListener('click', () => {
    window.location.href = "car.html"
})