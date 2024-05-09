
import express from "express";
import __dirname from "./util.js";
import handlebars from "express-handlebars";
import { ProductsManager } from "./manager/products.js";
import { Server } from "socket.io";

const PORT = 8080;

const app = express();

export const productsManager = new ProductsManager();

// app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use (express.urlencoded({extended: true}));

app.engine("hbs", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use(express.static('public'));


app.get("/", async (req, res) => {
    const id = req.params.id;
    const limit = req.query.limit;
    try {
        if (!!id) {
            res.send(await productsManager.getProductById(id));
        } else {
            return res.render("home", { products: await productsManager.getAllProducts(limit) });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: -1, description: "Error fetching products" });
    }
});

app.get("/realtimeproducts", async (req, res) => {
    return res.render("realtimeproducts");
});

//correr el localhost
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
server.on("error", error => console.log(`Server error: ${error}`));

const socketServer = new Server(server);

socketServer.on('connection', (socket) => {
    console.log('User connected');

    socket.on('new-product', async (product) => {
        console.log('New product:', product);
        await productsManager.saveProduct(product);
        socket.emit('new-product-list', await productsManager.getAllProducts());
    });

    socket.on('delete-product', (productId) => {
        console.log('Delete product:', productId);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

