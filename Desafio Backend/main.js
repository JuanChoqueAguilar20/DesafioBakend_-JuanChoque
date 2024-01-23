
// class ProductManager {
//     constructor() {
//         this.products = []
//     }
    
//     static id = 0


//     addProduct (title, description, price, thumbnail, code, stock){
//         ProductManager.id++;
//         this.products.push({title, description, price, thumbnail, code, stock, id: ProductManager.id})
//     }

//     getProducts () {
//         return this.products.slice()
//     }

//     getProductById(id){
//         if(!this.products.find((product) =>product.id === id )){
//         console.log ("No se encuentra el codigo")
//     } else {
//         console.log ("El codigo existe")
//     }
//     }
// }


// const productos = new ProductManager()

// console.log(productos.getProducts());

// productos.addProduct ( "Producto de prueba 1", "Este es un producto de prueba", 200, "sin imagen", "abc123", 25)
// productos.addProduct ( "Producto de prueba 2", "Este es un producto de prueba", 200, "sin imagen", "abc124", 25)


// console.log(productos.getProducts());

// productos.getProductById(2);

// clase producto Manager
class ProductManager{
    constructor() {
        this.products = []
    }
    
    static id = 0

    getProducts () {
        return this.products
    }

    addProduct (title, description, price, thumbnail, code, stock){
        ProductManager.id++;
        this.products.push({title, description, price, thumbnail, code, stock, id: ProductManager.id})
        }
        
    getProductById(id){
        const foundProduct = this.products.find((product) => product.id === id)
        if(foundProduct){
            console.log ("Producto ha sido encontrado", foundProduct)
            } else {
              console.log ("Error, producto no encontrado", null)  
            }
    } 
}

const productos = new ProductManager()

// Mi primera llamada
console.log(productos.getProducts());

// Agregar producto
productos.addProduct ( "Producto de prueba 1", "Este es un producto de prueba", 200, "sin imagen", "abc123", 25)
productos.addProduct ( "Producto de prueba 2", "Este es un producto de prueba", 200, "sin imagen", "abc124", 25)
productos.addProduct ( "Producto de prueba 3", "Este es un producto de prueba", 200, "sin imagen", "abc125", 25)

// Segunda llamada arreglo con producto
console.log(productos.getProducts());

// Obtener producto por Id
productos.getProductById(3);