import { Router } from "express";
import { crearDetallePedido, actualizarDetallePedido, eliminarDetallePedido } from "../services/detallePedido.services.js";
import { verifyToken } from "../middleware/verifyToken.js";

const routerCarrito = Router();

routerCarrito.post("/carrito", verifyToken, crearDetallePedido);

routerCarrito.patch("/carrito", verifyToken, actualizarDetallePedido);

routerCarrito.delete("/carrito", verifyToken, eliminarDetallePedido);

export default routerCarrito;