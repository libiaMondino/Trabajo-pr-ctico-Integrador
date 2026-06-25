import { PUERTO } from "./config.js";
import { sequelize } from "./dataBase.js";


import express from "express";
import cors from "cors";
//import fs from "fs";
import bcrypt from "bcrypt";

// RUTAS
import routerProductos from "./routes/productos.routes.js";
import routerDetallePed from "./routes/detallePedido.routes.js";
import routerPedido from "./routes/pedido.routes.js";
import routerUsuarios from "./routes/usuarios.routes.js";


// MODELOS 
import "./models/associations.js";
import "./models/Producto.js";
import "./models/DetallePedido.js";
import "./models/Pedido.js";
import {Usuario} from "./models/Usuario.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/productos", routerProductos);
app.use(routerDetallePed);
app.use("/usuarios", routerUsuarios);
app.use(routerPedido);    

try {
  await sequelize.sync();

  app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en puerto ${PUERTO}`);
  });
  
} catch (error) {
  console.log(`Hubo un error de inicialización: ${error}`);
} 

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