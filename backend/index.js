import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// Configuración de lowdb con valores iniciales
const adapter = new JSONFile("db.json");
const db = new Low(adapter, { users: [] });

await db.read();       // Carga db.json
await db.write();      // Guarda si no existe

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// 🚀 Ruta de registro
app.post("/register", async (req, res) => {
  const { username, password, phone } = req.body;

  if (!username || !password || !phone) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  const userExists = db.data.users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: "El usuario ya existe." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  db.data.users.push({ username, password: hashedPassword, phone });
  await db.write();

  res.status(201).json({ message: "Usuario registrado exitosamente." });
});

// 🔐 Ruta de login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = db.data.users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Credenciales inválidas." });
  }

  res.status(200).json({ message: "Login exitoso." });
});

// 🟢 Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
