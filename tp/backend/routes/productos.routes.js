/*LO QUE FALTA
* Revisar las rutas de cada método(admin, superadmin,usuario)
* Funcion verify Token
*/ 
import { Router } from "express";
import { encontrarProducto, encontrarProductos, crearProducto, actualizarProducto, eliminarProducto } from "../services/producto.services.js";
const routerProductos = Router();

/*Acciones que pueden realizar todos*/
routerProductos.get("/productos", encontrarProductos);
routerProductos.get("/productos/categoria/:categoria", encontrarProductos);

routerProductos.get("/productos/:id", encontrarProducto);
routerProductos.get("/productos/categoria/:categoria/:id", encontrarProducto);

/*Solo admin y Superadmin*/
/*Falta la función verify token antes de cada una de las funciones*/ 
routerProductos.post("/nuevo-producto",crearProducto);

routerProductos.patch("/productos/actualizar/:id", actualizarProducto);
routerProductos.patch("/productos/categoria/:categoria/:id", actualizarProducto);

routerProductos.delete("/productos/eliminar/:id", eliminarProducto);
routerProductos.delete("/productos/categoria/:categoria/:id", eliminarProducto);

export default routerProductos;