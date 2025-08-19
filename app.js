const fs = require('fs');
const fetch = require('node-fetch').default;
const API_URL = 'https://fakestoreapi.com/products';
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


//Buscar la información de un determinado producto, utilizando un “id” como parámetro (GET)
async function getProductById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error(`Producto con ID ${id} no encontrado`);
        const product = await response.json();
        console.log(`Producto con ID ${id}:`, product);
        return product;
    } catch (error) {
        console.error(error.message);
    }
}

// Preguntar ID al usuario
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