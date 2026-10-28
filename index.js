require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

const colecciones = ['mascotas', 'veterinarios', 'consultas'];

// Validar nombre de colección
app.param('coleccion', (req, res, next, valor) => {
  if (!colecciones.includes(valor)) {
    return res.status(404).json({ error: 'Colección no válida' });
  }
  next();
});

// POST: insertar un documento
app.post('/:coleccion', async (req, res) => {
  try {
    const datos = { ...req.body };
    if (datos.fecha) datos.fecha = new Date(datos.fecha);
    const r = await db.collection(req.params.coleccion).insertOne(datos);
    res.status(201).json({ mensaje: 'Guardado en Atlas', id: r.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: listar documentos
app.get('/:coleccion', async (req, res) => {
  try {
    const lista = await db.collection(req.params.coleccion).find().toArray();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function iniciar() {
  await client.connect();
  db = client.db('veterinaria');
  console.log('Conectado a Atlas');
  app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
}

iniciar().catch(console.error);