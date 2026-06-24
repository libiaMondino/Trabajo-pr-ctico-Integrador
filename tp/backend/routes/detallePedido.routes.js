import { Router } from "express";
import { crearDetallePedido, actualizarDetallePedido, eliminarDetallePedido } from "../services/detallePedido.services.js";
import { verifyToken } from "../middleware/verifyToken.js";

const routerDetallePed = Router();
routerDetallePed.post("/carrito",verifyToken, crearDetallePedido);
routerDetallePed.put("/carrito",verifyToken, actualizarDetallePedido);
routerDetallePed.delete("/carrito",verifyToken, eliminarDetallePedido);

export default routerDetallePed;