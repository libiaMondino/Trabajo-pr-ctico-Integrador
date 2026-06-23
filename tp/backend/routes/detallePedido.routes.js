// Falta validate Token function, solo usuarios pueden agregar al carrito
import { Router } from "express";
import { crearDetallePedido, actualizarDetallePedido, eliminarDetallePedido } from "../services/detallePedido.services";

const router = Router();
router.post("/carrito", crearDetallePedido);
router.put("/carrito",actualizarDetallePedido);
router.delete("/carrito",eliminarDetallePedido);