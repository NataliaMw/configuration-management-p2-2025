const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { Low, JSONFile } = require("lowdb");

// Inicializar base de datos JSON con lowdb
const adapter = new JSONFile("db.json");
const db = new Low(adapter);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Inicializa los datos si está vacío
async function initDB() {
  await db.read();
  db.data ||= { users: [] };
  await db.write();
}

initDB();

// Registro
app.post("/register", async (req, res) => {
  const { username, password, phone } = req.body;

  if (!username || !password || !phone) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  await db.read();
  const userExists = db.data.users.find(user => user.username === username);

  if (userExists) {
    return res.status(400).json({ message: "El usuario ya existe." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.data.users.push({ username, password: hashedPassword, phone });
  await db.write();

  res.status(201).json({ message: "Usuario registrado exitosamente." });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  await db.read();
  const user = db.data.users.find(user => user.username === username);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas." });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Credenciales inválidas." });
  }

  res.status(200).json({ message: "Login exitoso." });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
