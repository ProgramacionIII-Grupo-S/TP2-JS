# TP 2 JS Fecth y FileSystem
## PROGRAMACIÓN III - 2025 2do cuatrimestre
## TECNICATURA UNIVERSITARIA EN DESARROLLO WEB - UNER   

## 📌 Consigna

El script implementa las siguientes funcionalidades:

### 🔹 API Fetch
- Recuperar la información de **todos los productos** (GET).
- Recuperar un **número limitado** de productos (GET).
- **Persistir** los datos obtenidos en un archivo local `productos.json`.
- **Agregar** un nuevo producto (POST).
- Recuperar un producto por **ID** (GET).
- **Eliminar** un producto (DELETE).
- **Modificar** los datos de un producto (PUT).

### 🔹 FileSystem
- **Agregar** un producto al archivo local `productos.json`.
- **Eliminar** productos cuyo precio sea superior a un valor determinado.
- Imprimir en consola los resultados de las operaciones.

---

## 📂 Estructura del proyecto  
/TP2-JS   
|-- index.js # Script principal con toda la lógica   
|-- productos.json # Archivo local donde se guardan los productos   
|-- package.json # Archivo de configuración de Node.js   

## ⚙️ Instalación y ejecución

1. Clonar el repositorio o descomprimir el archivo entregado.
2. Abrir una terminal en la carpeta del proyecto.
3. Instalar dependencias
```
npm install

```
4. Ejecutar en la terminal el script:
 ```
 node app.js

 ```

## 📝 Notas
- La API utilizada es FakeStore API, por lo tanto las operaciones POST, PUT y DELETE son simuladas.
Es decir, no se persisten en el servidor real, pero se muestran en consola y se pueden guardar en productos.json para simular persistencia local.

- Todas las operaciones imprimen el resultado en la consola para su verificación.

## 👥 Integrantes del Grupo   

- [Aguilar, Priscila Magali](https://github.com/PriscilaAguilar1214)
- [Aguilar, Yamila Maillen](https://github.com/YamilaAguilar)
- [Blanc, Eugenia](https://github.com/eugenialite)
- [Cartier, Lisette](https://github.com/usuario)
- [Gainza, Marcos Gabriel](https://github.com/marcosgainza)
- [Unrein, Yanina Soledad](https://github.com/Yanina-Unrein)

## Número de grupo: 
- Grupo S