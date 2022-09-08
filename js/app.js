const seccion = document.querySelector("section#estilos")
const URL = "js/array.json"
let array = []
let estilosHTML = ""

const peticionFetch = async ()=> {
    const response = await fetch(URL)
    const data = await response.json()
    return data
}


const retornoDistintosEstilos = (Estilos)=> {
    const {id, nombre, precio} = Estilos
return `<div class="estilos">
            <label for="estilo">Selecciona el estilo:</label>
            <select id="${id}, ${nombre}, ${precio}">
        </div>`
}


const retornoEstilosError = ()=> {
    return `<div class="error">
    <p>Hubo algun error</p>
    </div>`
}


const cargarEstilos = async ()=> {
    let estilosHTML = ""
    try{
    array = await peticionFetch()
    array.forEach(Estilos => {
        estilosHTML += retornoDistintosEstilos(Estilos)
    })
    seccion.innerHTML = estilosHTML
    } catch (error) {
        seccion.innerHTML = retornoEstilosError()
    }
}
cargarEstilos()















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