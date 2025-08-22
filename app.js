const fs = require("fs").promises;
const path = require("path");
const FILE = path.join(__dirname, "productos.json");


const fetch = global.fetch || ((...a) => import("node-fetch").then(({ default: f }) => f(...a)));
const API = "https://fakestoreapi.com/products";


async function readList() {
  try {
    const txt = await fs.readFile(FILE, "utf-8");
    return txt.trim() ? JSON.parse(txt) : [];
  } catch (e) {
    if (e.code === "ENOENT") return [];
    throw e;
  }
}
async function writeList(arr) {
  await fs.writeFile(FILE, JSON.stringify(arr, null, 2), "utf-8");
}



async function seedFromAPI() {
  const r = await fetch(`${API}?limit=3`);
  const data = await r.json();
  const simple = data.map(p => ({ id: p.id, title: p.title, price: p.price }));
  await writeList(simple);
  console.log(" guardados 3 productos en productos.json");
}


async function fsList() {
  const list = await readList();
  console.log(" Productos:", list);
}

async function fsAdd(idStr, title, priceStr) {
  if (!idStr || !title || !priceStr) {
    console.log('Uso: node app.js add <id> "<title>" <price>');
    return;
  }
  const product = { id: Number(idStr), title, price: Number(priceStr) };
  const list = await readList();
  list.push(product);
  await writeList(list);
  console.log("Agregado:", product);
}

async function fsRemoveGreaterThan(limitStr) {
  if (!limitStr) {
    console.log("Uso: node app.js rmgt <precioLimite>");
    return;
  }
  const limit = Number(limitStr);
  const list = await readList();
  const out = list.filter(p => p.price <= limit);
  await writeList(out);
  console.log(`Eliminados productos con price > ${limit}. Quedan:`, out);
}

(async () => {
  const [,, cmd, a1, a2, a3] = process.argv;
  try {
    switch (cmd) {
      case "seed":    await seedFromAPI(); break;      
      case "list":    await fsList(); break;           
      case "add":     await fsAdd(a1, a2, a3); break;  
      case "rmgt":    await fsRemoveGreaterThan(a1); break; 
      default:
        console.log("comandos prueba:");//como probar en consola
        console.log("  node app.js seed             # guarda 3 productos en productos.json");
        console.log("  node app.js list             # muestra productos locales");
        console.log('  node app.js add 10 "Lote" 5000   # agrega producto local');
        console.log("  node app.js rmgt 3000        # elimina productos con precio > 3000");
    }
  } catch (e) {
    console.error(" Error:", e.message);
  }
})();