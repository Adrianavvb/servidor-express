const express = require("express");
const app = express();
const listViewRouter = require("./list-view-router.js");
const listEditRouter = require("./list-edit-router.js");
const tasks = require("./tasks.js");


app.use(express.json());



// Agregar los routers a las rutas principales
app.use("/edit", listEditRouter);
app.use("/view", listViewRouter);

app.get("/tasks", (req, res) => {
  res.json(tasks);
  console.log(tasks);
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor en funcionamiento en el puerto 3000.");
});
