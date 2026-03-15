let carrito = []
let total = 0

function agregar(nombre) {

    carrito.push({ nombre })

    total += 1

    render()

}

function render() {

    const lista = document.getElementById("lista")

    lista.innerHTML = ""

    carrito.forEach(p => {
        lista.innerHTML += `<p>${p.nombre} - $1</p>`
    })

    document.getElementById("contador").innerText = carrito.length
    document.getElementById("total").innerText = "Total: $" + total

}

async function pagar() {

    if (carrito.length === 0) {
        alert("Carrito vacío")
        return
    }

    const res = await fetch("/crear-pago", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: carrito })
    })

    const data = await res.json()

    window.location.href = data.link

}