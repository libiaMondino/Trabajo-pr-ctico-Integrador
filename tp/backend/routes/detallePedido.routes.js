// Falta validate Token function, solo usuarios pueden agregar al carrito
import { Router } from "express";
import { crearDetallePedido, actualizarDetallePedido, eliminarDetallePedido } from "../services/detallePedido.services.js";

const routerDetallePed = Router();
routerDetallePed.post("/carrito", crearDetallePedido);
routerDetallePed.put("/carrito",actualizarDetallePedido);
routerDetallePed.delete("/carrito",eliminarDetallePedido);

export default routerDetallePed;