
import { Router } from "express";
import { actualizarPedido} from "../services/pedido.services.js";
import { eliminarPedido } from "../services/pedido.services.js";
import { verifyToken } from "../middleware/verifyToken.js";

const routerPedido= Router();
routerPedido.patch("/carrito/:id",verifyToken,actualizarPedido);
routerPedido.delete("/carrito/:id", verifyToken,eliminarPedido);
export default routerPedido;