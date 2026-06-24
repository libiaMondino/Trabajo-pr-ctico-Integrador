import { PUERTO } from "./config.js";
import { sequelize } from "./dataBase.js";
import routerProductos from "./routes/productos.routes.js";
import routerDetallePed from "./routes/detallePedido.routes.js";
import "./models/Producto.js";
import "./models/DetallePedido.js";
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routerProductos);
app.use(routerDetallePed);

try{
  
  app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en puerto ${PUERTO}`);
  });

  await sequelize.sync();

} catch (error) {
  console.log(`Hubo un error de inicialización`);
} finally{
  
  app.get("/", (req, res) => {
    res.json({
      mensaje: "Backend funcionando correctamente"
    });
  });
}

/* Cambiar
app.get("/productos", (req, res) => {
  const productos = JSON.parse(
    fs.readFileSync("./data/productos.json")
  );

  res.json(productos);
});
*/
