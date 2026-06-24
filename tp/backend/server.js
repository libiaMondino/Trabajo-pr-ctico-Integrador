import { PUERTO } from "./config.js";
import { sequelize } from "./dataBase.js";
import routerProductos from "./routes/productos.routes.js";
import routerDetallePed from "./routes/detallePedido.routes.js";
import "./models/Producto.js";
import "./models/DetallePedido.js";
import routerUsuarios from "./routes/usuarios.routes.js";
import "./models/Usuario.js";
import express from "express";
import cors from "cors";
import fs from "fs";
import { Usuario } from "./models/Usuario.js";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/productos", routerProductos);
app.use(routerDetallePed);
app.use("/usuarios", routerUsuarios);

try {

  app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en puerto ${PUERTO}`);
  });

  await sequelize.sync();
  

} catch (error) {
  console.log(`Hubo un error de inicialización`);
} finally {

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
const crearAdmin = async () => {
    const adminExiste = await Usuario.findOne({
        where: { email: "admin@test.com" }
    });

    if (!adminExiste) {
        const hashedPassword = await bcrypt.hash("12345678", 10);

        await Usuario.create({
            name: "Admin",
            email: "admin@test.com",
            password: hashedPassword,
            role: "super_admin"
        });

        console.log("Admin creado");
    }
};

crearAdmin();