const express = require("express");
const app = express();

const listViewRouter = require("./list-view-router.js");
const listEditRouter = require("./list-edit-router.js");
const tasks = require("./tasks.js");

app.use(express.json());

// Middleware a nivel de aplicación para gestionar métodos HTTP válidos/////
function validateMethod(req, res, next) {
  const validMethods = ["GET", "POST", "PUT", "DELETE"];
  if (!validMethods.includes(req.method)) {
    return res.status(405).json({ error: "Método HTTP no válido." });
  }
  next();
}

//   Usar el middleware a nivel de aplicación//
app.use(validateMethod);

// Agregar los routers a las rutas principales//
app.use("/edit", listEditRouter);
app.use("/view", listViewRouter);

app.get("/tasks", (req, res) => {
  res.json(tasks);
  console.log(tasks);
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor en funcionamiento en el puerto 3000.");
});
