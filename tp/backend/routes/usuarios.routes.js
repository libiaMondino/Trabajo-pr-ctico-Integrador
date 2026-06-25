/*Controlar que sean esas las rutas*/
import { Router } from "express";
import { crearUsuario, actualizarUsuario, eliminarUsuario, loginUsuario, obtenerUsuarios } from "../services/usuario.services.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { requireRole } from "../middleware/requireRole.js";

const routerUsuarios = Router();

routerUsuarios.post("/registro", crearUsuario);
routerUsuarios.post("/login", loginUsuario);

/*Solo superAdmin*/
/*Función verifyToken antes de las otras( + next())*/
routerUsuarios.get(
    "/",
    verifyToken,
    requireRole(["super_admin"]),
    obtenerUsuarios
);

routerUsuarios.patch("/usuarios/:id",
    verifyToken,
    requireRole(["super_admin"]),
    actualizarUsuario
);

routerUsuarios.delete(
    "/super-admin/usuarios/:id",
    verifyToken,
    requireRole("super_admin"),
    eliminarUsuario
);

export default routerUsuarios;