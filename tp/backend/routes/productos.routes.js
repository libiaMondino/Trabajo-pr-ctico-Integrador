/*LO QUE FALTA
* Revisar las rutas de cada método(admin, superadmin,usuario)
* Funcion verify Token
*/ 
import { Router } from "express";
import { encontrarProducto, encontrarProductos, crearProducto, actualizarProducto, eliminarProducto } from "../services/producto.services";
const router = Router();

/*Acciones que pueden realizar todos*/
router.get("/productos/:categoria?", encontrarProductos);
router.get("/productos/:categoria?/:id", encontrarProducto);

/*Solo admin y Superadmin*/
/*Falta la función verify token antes de cada una de las funciones*/ 
router.post("/nuevo-producto",crearProducto);

router.put("/productos/:categoria?/:id", actualizarProducto);

router.delete("/productos/:categoria?/:id", eliminarProducto);

export default router;