/*Controlar que sean esas las rutas*/ 
import { Router } from "express";
import { crearUsuario, actualizarUsuario, eliminarUsuario } from "../services/usuario.services";

const routerUsuarios = Router();

routerUsuarios.post("/registro",crearUsuario);

/*Solo superAdmin*/
/*Función verifyToken antes de las otras( + next())*/ 
routerUsuarios.patch("/super-admin/usuarios/:id", actualizarUsuario);

routerUsuarios.delete("/super-admin/usuarios/:id", eliminarUsuario);

export default routerUsuarios;