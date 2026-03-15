const express = require("express")
const mercadopago = require("mercadopago")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

mercadopago.configure({
    access_token: "APP_USR-7911265903623462-031100-dd9e2c08c2321516df20b964853a5d31-3259043342"
})

app.post("/crear-pago", async (req, res) => {

    const items = req.body.items

    const preference = {

        items: items.map(p => ({
            title: p.nombre,
            unit_price: 1,
            quantity: 1,
            currency_id: "ARS"
        })),

        back_urls: {
            success: "http://localhost:3000/felicitaciones.html",
            failure: "http://localhost:3000",
            pending: "http://localhost:3000"
        },

    }

    const response = await mercadopago.preferences.create(preference)

    res.json({
        link: response.body.init_point
    })

})

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000")
})