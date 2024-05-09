import {promises as fs} from "fs";
import { v4 as uuidv4 } from "uuid";

//Clase productManager - describir el producto
export class ProductsManager {

    constructor(name, timestamp, description, code, imageUrl, price, stock) {
    this.path = "src/db/product.json"; 
    this.id = uuidv4();
    this.timestamp = timestamp;
    this.name = name;
    this.description = description;
    this.code = code;
    this.imageUrl = imageUrl;
    this.price = price;
    this.stock = stock;
    }

//Obtener los productos
getAllProducts = async (limit = null) => {
    try {
        let fileContent = await fs.readFile(this.path, "utf-8");
        let productsJSON = JSON.parse(fileContent);
        if (limit) {
            productsJSON = productsJSON.slice(0, limit);
        }
        return productsJSON;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener todos los productos");
    }
}

//Obtener los productos con el id
getProductById = async (id) => {
    try {
        const response = await this.getAllProducts();
        const product = response.find((product) => product.id == id);
        return product || null;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener el producto por ID");
    }
}

//Agregar producto
saveProduct = async (newProduct) => {
    try {
        // Verificar que se envíen todos los parámetros del producto
        const requiredParams = ["title", "description", "code", "price", "stock"];
        const missingParams = requiredParams.filter(param => !(param in newProduct));
        //verificamos si hay elementos en el array
        if (missingParams.length > 0) {
            //si falta parametros,lanzamos una excepción 
            throw new Error(`Faltan parámetros obligatorios: ${missingParams.join(", ")}`);
        }

        let products = await this.getAllProducts();
        // Verificar si ya existe un producto con el mismo código
        const existingProductIndex = products.findIndex((product) => product.code === newProduct.code);

        if (existingProductIndex !== -1) {
            throw new Error(`Ya existe un producto con el código ${newProduct.code}`);
        }
        // Generar un nuevo ID
        const lastId = products.length > 0 ? products[products.length - 1].id : 0;
        const ramdomId = uuidv4()
        //asignar el ultimo id incrementado o el uuidv4 aleatorio
        newProduct.id = lastId > 0 ? lastId + 1 : ramdomId;

        // Agregar el nuevo producto a la lista
        products.push(newProduct);
        // Guardar la lista actualizada en el archivo JSON
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;

    } catch (error) {
        console.log(error);
        throw new Error("Error al guardar el producto");
    }
}

//Actualizar el producto con el id
updateProductById = async (id, updatedProductData) => {
    try {
        let fileContent = await fs.readFile(this.path, "utf-8");
        if (fileContent != "") {
            let products = JSON.parse(fileContent);
            const index = products.findIndex((product) => product.id == id);

            if (index != -1) {
                products[index] = { ...products[index], ...updatedProductData };
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                return products[index];
            } else {
                throw new Error(`No se encontró ningún producto con el ID ${id}`);
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el producto");
    }
}

//Eliminar un producto con el id
deleteProductById = async (id) => {
    try {
        //leer el archivo de la base de datos, filecontent => tendra el contenido.
        let fileContent = await fs.readFile(this.path, "utf8"); // (utf-8)=> interpretarlo como texto unicode
        if (fileContent != "") {
            let products = JSON.parse(fileContent);
            const index = products.findIndex((product) => product.id == id);
            if (index != -1) {
                products.splice(index, 1); // eliminamos el producto encontrado en la posicion index
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                return 1;
            } else {
                throw new Error(`No se encontró ningún producto con el ID ${id}`);
            }
        }
    } catch (error) {
        console.log(`Error al borrar el producto con ID ${id}: ${error}`);
        throw new Error("Error al borrar el producto");
    }
}
}

