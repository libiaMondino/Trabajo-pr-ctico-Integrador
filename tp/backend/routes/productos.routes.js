import { Router } from "express";
import {
    encontrarProducto,
    encontrarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../services/producto.services.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { requireRole } from "../middleware/requireRole.js";

const routerProductos = Router();

/* RUTAS PUBLICAS */
routerProductos.get("/", encontrarProductos);
routerProductos.get("/categoria/:categoria", encontrarProductos);
routerProductos.get("/categoria/:categoria/:id", encontrarProducto);
routerProductos.get("/:id", encontrarProducto);

/* RUTAS PROTEGIDAS */
routerProductos.post(
    "/",
    verifyToken,
    requireRole(["admin", "super_admin"]),
    crearProducto
);

routerProductos.patch(
    "/:id",
    verifyToken,
    requireRole(["admin", "super_admin"]),
    actualizarProducto
);

routerProductos.delete(
    "/:id",
    verifyToken,
    requireRole(["admin", "super_admin"]),
    eliminarProducto
);

export default routerProductos;