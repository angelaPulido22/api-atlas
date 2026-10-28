API Veterinaria

API con Node.js, Express y MongoDB Atlas para guardar y consultar mascotas, veterinarios y consultas.

Uso
Instalar dependencias:
   npm install
Crear un archivo .env con:
   MONGO_URI=mongodb+srv://usuario:contraseña@cluster0.xxxxx.mongodb.net/
Ejecutar:
   node index.js
Rutas
GET /mascotas y POST /mascotas
GET /veterinarios y POST /veterinarios
GET /consultas y POST /consultas
