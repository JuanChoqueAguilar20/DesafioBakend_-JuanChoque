//Desafio 3

//importamos los modulos-express
import express from "express";
//importamos la clase productmanager 
import ProductManager from "./ProductManager.js"
// Creamos la aplicación Express
const app = Express()
//le configuramos un portal localghost 8080
const PORT = 8080;
//creamos un objeto los produtos que tenemos en JSON
const productManager = new ProductManager("../products.json")

app.use(express.json ()) //usamos Middleware para parsear el JSON

//Definimos nuestra ruta aquí:
//Los endpoints para obtener los productos que queremos que nos aparezca

app.get("/products", async (req, res)=> {
    try{
        const limit = parseInt (req.query.limit) || undefined
        const products = await productManager.getProducts()
        res.json (limit ? products.slice(0, limit) : products)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Los endpoints para obtener el producto ID solicitado
app.get("/products/:id", async (req, res) => {
    try{
        const productId = parseInt (req.params.id)
        const product = await productManager.getProductById(productId)
        //ternario para ver si se encontró el producto
        product ? res.send(product) : res.status(404).send("No se encontró el producto")
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

//inicializamos el servidor 
app.listen (PORT, () => {
    console.log (`Server corriendo en el puerto ${PORT}`)
})
