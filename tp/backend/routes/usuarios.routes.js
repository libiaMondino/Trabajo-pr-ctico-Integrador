/*Controlar que sean esas las rutas*/ 
import { Router } from "express";
import { crearUsuario, actualizarUsuario, eliminarUsuario, loginUsuario } from "../services/usuario.services.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { requireRole } from "../middleware/requireRole.js";

const routerUsuarios = Router();

routerUsuarios.post("/registro",crearUsuario);
routerUsuarios.post("/login", loginUsuario);

/*Solo superAdmin*/
/*Función verifyToken antes de las otras( + next())*/ 
routerUsuarios.patch("/usuarios/:id",
    verifyToken,
    actualizarUsuario
);

routerUsuarios.delete(
    "/super-admin/usuarios/:id",
    verifyToken,
    requireRole("super_admin"),
    eliminarUsuario
);

export default routerUsuarios;