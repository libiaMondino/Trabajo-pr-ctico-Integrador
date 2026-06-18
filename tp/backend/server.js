const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend funcionando correctamente"
  });
});

app.get("/productos", (req, res) => {
  const productos = JSON.parse(
    fs.readFileSync("./data/productos.json")
  );

  res.json(productos);
});

app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});