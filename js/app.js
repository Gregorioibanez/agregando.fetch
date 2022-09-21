

const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment
let carrito = {}


document.addEventListener('DOMContentLoaded', () => {
    peticionFetch()
    if(localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})
cards.addEventListener('click', e => {
    addCarrito(e)
})
items.addEventListener('click', e => {
    btnAgregar(e)
})


const peticionFetch = async ()=> {
    try {
    const response = await fetch(URL)
    const data = await response.json()
    marcarCards(data)
    return data
    } catch (error) {
    console.log(error)
    }
}


const marcarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h3').textContent = producto.nombre
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.imagen)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}



const addCarrito = e => {
    /* console.log(e.target)
    console.log(e.target.classList.contains('btn-dark')) */
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        nombre: objeto.querySelector('h3').textContent,
        precio: objeto.querySelector('p').textContent,
        stock: 1
    }
    if(carrito.hasOwnProperty(producto.id)) {
        producto.stock = carrito [producto.id].stock + 1
    }

    carrito[producto.id] = { ...producto }
    pintarCarrito()
}

const pintarCarrito = () => {
    /* console.log(carrito) */
    items.innerHTML = ''
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.stock
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.stock * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}


const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`

        return
    }


    const nCantidad = Object.values(carrito).reduce((acc,{ stock }) => acc + stock, 0)
    const nPrecio = Object.values(carrito).reduce((acc,{ stock, precio }) => acc + stock * precio, 0)


    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () =>{
        carrito = {}
        pintarCarrito()
    })
}



const btnAgregar = e => {
    console.log(e.target)
    if(e.target.classList.contains('btn-info')){
        //console.log(carrito[e.target.dataset.id])

        const producto = carrito[e.target.id]
        producto.stock++
        carrito[e.target.dataset.id] = { ...producto}
        pintarCarrito()
    }

    if(e.target.classList.contains('btn-info')){
        const producto = carrito[e.target.id]
        producto.stock--
        if (producto.stock === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

























/* 
function cargarEstilos() {
    datosEstilos.forEach((elemento) => {
        estilo.innerHTML += `<option value="${elemento.factor}">${elemento.tipo}</option>`
    });
}
cargarEstilos()


const datosCompletos = ()=>{
    if (estilo.value !== "..." &&
        parseInt(metros2.value) > 0) {
            return true
        } else {
            return false
        }
}

const realizarCotizacion = () => {
if (datosCompletos()){
    const cotizacion = new Cotizador(estilo.value, metros2.value)
                console.log(cotizacion.cotizar())
                valor.innerText = cotizacion.cotizar()
    toastSwal("Gracias por elegirnos!", 'info', 'blue')
} else {
    toastSwal("Completa todos los valores solicitados para recibir una cotizacion", 'warning', '#FF0000')
}
}


const enviarPorEmail = ()=>{
    if (datosCompletos()){
    const enviarCotizacion = {
        fechaCotizacion: new Date().toLocaleString(),
        estilo: estilo[estilo.selectedIndex].text,
        metrosCuadrados: metros2.value,
        importe: valor.innerHTML
    }
    localStorage.setItem("UltimaCotizacion", JSON.stringify(enviarCotizacion))
    toastSwal("Cotizacion enviada, le responderemos a la brevedad!", 'success', 'darkgreen' )
} else {
    toastSwal("Completa todos los valores solicitados para recibir una cotizacion", 'warning', '#FF0000')
}
}

btnCotizar.addEventListener("click", realizarCotizacion)
btnEnviar.addEventListener("click", enviarPorEmail)


const toastSwal = (mensaje, icono, bgcolor)=> {
    Swal.fire({
        toast: true,
        position: 'top-end',
        text: mensaje,
        icono: icono,
        showConfirmButton: false,
        timer: 6000,
        background: bgcolor,
        color: 'white'
    })
} */