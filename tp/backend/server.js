import { PUERTO } from "./config.js";
import productoRoutes from "./routes/productos.routes.js"

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(productoRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend funcionando correctamente"
  });
});

/* Cambiar
app.get("/productos", (req, res) => {
  const productos = JSON.parse(
    fs.readFileSync("./data/productos.json")
  );

  res.json(productos);
});
*/
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en puerto ${PUERTO}`);
});