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
        if(this.products.some((product) =>product.code === code )){
            console.log ("Error, el codigo ya está siendo usado")
        } else {
            ProductManager.id++;
            this.products.push({title, description, price, thumbnail, code, stock, id: ProductManager.id})
            console.log ("Producto fue agregado con exito")
        }
    }

    getProductById(id){
        const foundProduct = this.products.find((product) => product.id === id)
        if(foundProduct){
            console.log ("Producto ha sido encontrado", foundProduct)
            } else {
              console.log ("Error, producto no encontrado")  
            }
    }
}

const productos = new ProductManager()

// Mi primera llamada
console.log(productos.getProducts());

// Agregar producto
productos.addProduct ( "Producto de prueba", "Este es un producto de prueba", 200, "sin imagen", "abc123", 25)
productos.addProduct ( "Producto de prueba", "Este es un producto de prueba", 200, "sin imagen", "abc123", 25)

// Segunda llamada arreglo con producto
console.log(productos.getProducts());

// Obtener producto por Id
productos.getProductById(2);

