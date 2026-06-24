// Falta middleware para lo del token
import { Router } from "express";
import { actualizarPedido, eliminarPedido } from "../services/pedido.services";
import routerUsuarios from "./usuarios.routes";

const routerPedido= Router();
routerUsuarios.patch("/carrito/:id",actualizarPedido);
routerUsuarios.delete("/carrito/:id", eliminarPedido);
export default routerPedido;