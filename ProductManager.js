
// Desafio

// clase producto Manager
// class ProductManager{
//     constructor() {
//         this.products = []
//     }
    
//     static id = 0

//     getProducts () {
//         return this.products
//     }

//     addProduct (title, description, price, thumbnail, code, stock){
//         ProductManager.id++;
//         this.products.push({title, description, price, thumbnail, code, stock, id: ProductManager.id})
//         }
        
//     getProductById(id){
//         const foundProduct = this.products.find((product) => product.id === id)
//         if(foundProduct){
//             console.log ("Producto ha sido encontrado", foundProduct)
//             } else {
//               console.log ("Error, producto no encontrado", null)  
//             }
//     } 
// }

// const productos = new ProductManager()

// Mi primera llamada
// console.log(productos.getProducts());

// Agregar producto
// productos.addProduct ( "Producto de prueba 1", "Este es un producto de prueba", 200, "sin imagen", "abc123", 25)
// productos.addProduct ( "Producto de prueba 2", "Este es un producto de prueba", 200, "sin imagen", "abc124", 25)
// productos.addProduct ( "Producto de prueba 3", "Este es un producto de prueba", 200, "sin imagen", "abc125", 25)

// Segunda llamada arreglo con producto
// console.log(productos.getProducts());

// Obtener producto por Id
// productos.getProductById(3);



// desafio 

// class ProductManager {
//     constructor() {
//         this.productos = [];
//         this.lastProductId = 0;
//     }

//     validate(title, description, price, thumbnail, code, stock) {
//         if (!title || !description || !price || !thumbnail || !code || !stock) {
//             throw new Error("Todos los campos son obligatorios.");
//         }

//         if (this.productos.some(product => product.code === code)) {
//             throw new Error("El código del producto ya está en uso.");
//         }
//     }

//     addProduct(title, description, price, thumbnail, code, stock) {
//         this.validate(title, description, price, thumbnail, code, stock);

//         const newProduct = {
//             id: ++this.lastProductId,
//             title,
//             description,
//             price,
//             thumbnail,
//             code,
//             stock
//         };

//         this.productos.push(newProduct);
//     }

//     getProducts() {
//         return this.productos;
//     }

//     getProductById(productId) {
//         const product = this.productos.find(p => p.id === productId);

//         if (product) {
//             return product;
//         } else {
//             console.error("Producto no encontrado. ID: ", productId);
//             throw new Error("Not found");
//         }
//     }
// }

// desafio 


const fs = require("fs").promises;

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        console.log("Agregando producto: ", product)
        try {
            const products = await this.getProductsFromFile();
            
            // Asignar un ID autoincrementable
            const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
            product.id = lastProductId + 1;

            // Agrega el nuevo producto al array
            products.push(product);

            // Guarda en el archivo
            await this.saveProductsToFile(products);

            return product.id;
        } catch (error) {
            throw new Error("Error al agregar el producto.");
        }
    }

    async getProducts() {
        console.log("Obteniendo todos los productos")
        try {
            return await this.getProductsFromFile();
        } catch (error) {
            throw new Error("Error al obtener los productos.");
        }
    }

    async getProductById(productId) {
        console.log("Obteniendo los productos por id: ", productId)
        try {
            const products = await this.getProductsFromFile();
            return products.find(product => product.id === productId);
        } catch (error) {
            throw new Error("Error al obtener el producto por ID.");
        }
    }

    async updateProduct(productId, updatedFields) {
        console.log("Actualizando los productos con id: ", productId)
        try {
            const products = await this.getProductsFromFile();
            const index = products.findIndex(product => product.id === productId);

            if (index !== -1) {
                // Actualiza el producto
                products[index] = { ...products[index], ...updatedFields };

                // Guarda en el archivo
                await this.saveProductsToFile(products);
            } else {
                throw new Error("Producto no encontrado.");
            }
        } catch (error) {
            throw new Error("Error al actualizar el producto.");
        }
    }

    async deleteProduct(productId) {
        console.log("Eliminando producto con Id:", productId);
        try {
            const products = await this.getProductsFromFile();
            const updatedProducts = products.filter(product => product.id !== productId);

            if (updatedProducts.length < products.length) {
                // Guardar en el archivo solo si en caso se eliminó algún producto
                await this.saveProductsToFile(updatedProducts);
            } else {
                throw new Error("Producto no encontrado.");
            }
        } catch (error) {
            throw new Error("Error al eliminar el producto.");
        }
    }

    async getProductsFromFile() {
        try {
            const fileData = await fs.readFile(this.path, "utf-8");
            return JSON.parse(fileData);
        } catch (error) {
            // Si el archivo no existe o está vacío, esto retorna un array vacío
            return [];
        }
    }

    async saveProductsToFile(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
        } catch (error) {
            throw new Error("Error al guardar en el archivo.")
        }
    }
}

module.exports = ProductManager



