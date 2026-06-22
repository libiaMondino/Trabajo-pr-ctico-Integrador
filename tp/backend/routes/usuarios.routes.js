/*Controlar que sean esas las rutas*/ 
import { Router } from "express";
import { crearUsuario, actualizarUsuario, eliminarUsuario } from "../services/usuario.services";


router.post("/registro",crearUsuario);

/*Solo superAdmin*/
/*Función verifyToken antes de las otras( + next())*/ 
router.put("/super-admin/usuarios/:id", actualizarUsuario);

router.delete("/super-admin/usuarios/:id", eliminarUsuario);