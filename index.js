const express = require("express");
const app = express();

const tasks = [
  {
    id: "12345622",
    isCompleted: false,
    description: "lavar trastes",
  },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
