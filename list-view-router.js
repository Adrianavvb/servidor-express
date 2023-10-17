const express = require("express");
const router = express.Router();
const tasks = require("./tasks");

// Middleware para validar los parámetros de las rutas
function validateParams(req, res, next) {
  const validParams = ["completed", "incomplete"];
  if (!validParams.includes(req.params.taskStatus)) {
    return res.status(400).send("Parámetro no válido.");
  }
  next();
}

// Ruta GET para listar tareas completas
router.get("/:taskStatus", validateParams, (req, res) => {
  if (req.params.taskStatus === "completed") {
    const completedTasks = tasks.filter((task) => task.completed);
    res.json(completedTasks);
  } else if (req.params.taskStatus === "incomplete") {
    const incompleteTasks = tasks.filter((task) => !task.completed);
    res.json(incompleteTasks);
  }
});


module.exports = router;
