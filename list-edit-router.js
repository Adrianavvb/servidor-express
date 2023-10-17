const express = require("express");
const router = express.Router();

const tasks = require("./tasks");

// Middleware para validar el cuerpo de las solicitudes POST y PUT
function validateTask(req, res, next) {
  const task = req.body;
  if (!task || Object.keys(task).length === 0) {
    return res
      .status(400)
      .json({ error: "El cuerpo de la solicitud está vacío." });
  }
  if (!task.title || !task.description) {
    return res.status(400).json({
      error:
        "Información no válida o atributos faltantes para crear las tareas.",
    });
  }
  next();
}

//ruta para la creacion de tareas

router.post("/create", validateTask, (req, res) => {
  tasks.push({ ...req.body, id: tasks.length +1});
  res.send("creando tarea");
  console.log(tasks);
});


//ruta para la eliminacion de tareas
router.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  //respuesta segun el resultado de la solicitud de eliminacion
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: "Tarea eliminada ." });
  } else {
    res.status(404).json({ error: "No se encontró la tarea especificada." });
  }
});

//ruta para actualizar tareas
router.put("/update/:id", validateTask, (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = true;
    res.json({ message: "Tarea actualizada.", task });
  } else {
    res.status(404).json({ error: "No se encontró la tarea especificada." });
  }
});
module.exports = router;
