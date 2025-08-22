const fs = require('fs');
const fetch = require('node-fetch').default;
const API_URL = 'https://fakestoreapi.com/products';
const FILE_PATH = './productos.json';
const readline = require('readline');


async function fetchProductos(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al recuperar productos:', error);
        return null; // Retorna null si hay error
    }
}

// Recuperar todos los productos
async function getProductos() {
    return await fetchProductos(API_URL);
}

// Recuperar productos limitados
async function getProductosLimitados(limit = 5) {
    return await fetchProductos(`${API_URL}?limit=${limit}`);
}


// Guardar datos en JSON
function guardarEnJSON(filename, data) {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log(`Datos guardados en ${filename}`);
    } catch (error) {
        console.error('Error al guardar el archivo:', error);
    }
}

// Agregar un nuevo producto con el metodo POST

async function agregarProducto() {
    const nuevoProducto = {
        title: "Par de medias",
        price: 2.5,
        description: "Medias de algodon grueso, largas y de color negro",
        image: "https://acdn-us.mitiendanube.com/stores/001/709/280/products/d1-57c4c861e5f616bcef16249705290487-1024-1024.webp",
        category: "men's clothing"
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(nuevoProducto),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        console.log("Producto agregado:", data);

    } catch (error) {
        console.error("Error al agregar producto:", error);
    }
}

//Eliminar un producto

async function borrarProducto(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        console.log(`Producto eliminado:`, data);
    } catch (error) {
        console.error('Error al borrar el producto:', error);
    }
}

//Modificar un producto

async function editarProducto(id) {
    const productoModificado = {
        title: "Guantes para la moto",
        price: 5.0,
        description: "Guantes de cuero con aislamiento termico para el invierno",
        image: "https://www.repsol.es/content/dam/repsol-ecommerce/tienda/productos/g/guantes-para-moto-alpinestar-mm93-rio-hondo-v2-air/guantes-para-moto-alpinestar-mm93-rio-hondo-v2-air-001.jpg",
        category: "men's clothing"
    };

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(productoModificado),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        console.log(`Producto modificado:`, data);
    } catch (error) {
        console.error("Error al modificar producto:", error);
    }
}

//Buscar la información de un determinado producto, utilizando un “id” como parámetro (GET)
async function getProductById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error(`Producto con ID ${id} no encontrado`);
        const text = await response.text();
        if (!text) {
            console.log(`⚠️ El producto con ID ${id} no existe en la API.`);
            return null;
        }
        const product = JSON.parse(text);
        console.log(`Producto con ID ${id}:`, product);
        return product;
    } catch (error) {
        console.error(error.message);
    }
}

// Opcion 2: Buscar la información de un determinado producto preguntar ID al usuario
function preguntarId() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Ingrese el ID del producto a buscar: ', (answer) => {
            rl.close();
            resolve(parseInt(answer));
        });
    });
}


// Función principal
async function main() {
    console.log('--- Recuperando todos los productos ---');
    const todosLosProductos = await getProductos();
    if (todosLosProductos) {
        console.log('Total de productos:', todosLosProductos.length);
        console.log(todosLosProductos);
    }

    console.log('\n---------------------------------------\n');

    const limit = 5;
    console.log(`--- Recuperando ${limit} productos y guardándolos en productos.json ---`);
    const productosLimitados = await getProductosLimitados(limit);
    if (productosLimitados) {
        console.log(`Total de productos recuperados: ${productosLimitados.length}`);
        guardarEnJSON('productos.json', productosLimitados);
        console.log(productosLimitados);
    }

    console.log();
    console.log('Se agrego un nuevo producto');
    await agregarProducto();

    console.log();
    console.log('Se elimino el producto 19');
    await borrarProducto(19);

    console.log();
    console.log('Se modifico el producto 15');
    await editarProducto(15);

    // ----- Opción 1: ID definido en el código -----
    const idCodigo = 3; // Cambiar aquí para probar otro ID
    console.log('\n--- Buscar producto por ID (definido en código) ---');
    await getProductById(idCodigo);

    // ----- Opción 2: ID ingresado por usuario -----
    console.log('\n--- Buscar producto por ID (ingresado por usuario) ---');
    const idUsuario = await preguntarId();
    if (!isNaN(idUsuario)) {
        await getProductById(idUsuario);
    } else {
        console.log('ID inválido, debe ser un número.');
    }
}

main();