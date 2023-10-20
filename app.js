const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const users = [
  { id: 1, username: 'Adriana', password: 'Jejejew2' },
  { id: 2, username: 'Andrea', password: 'Jojojow2' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  //busca el usuario en el arrays 
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  } else {
    res.status(401).send('Username or password incorrect');
  }
});


app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
// Agregar los routers a sus rutas principales
const listViewRouter = require("./list-view-router.js");
const listEditRouter = require("./list-edit-router.js");
const tasks = require("./tasks.js");

function validateMethod(req, res, next) {
  const validMethods = ["GET", "POST", "PUT", "DELETE"];
  if (!validMethods.includes(req.method)) {
    return res.status(405).json({ error: "Método HTTP no válido." });
  }
  next();
}

app.use(validateMethod);

app.use("/edit", listEditRouter);
app.use("/view", listViewRouter);

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(3000);
console.log("listening on http://localhost:3000")
