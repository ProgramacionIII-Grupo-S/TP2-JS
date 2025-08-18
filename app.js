const fs = require('fs');
const fetch = require('node-fetch').default;
const API_URL = 'https://fakestoreapi.com/products';

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
}

main();