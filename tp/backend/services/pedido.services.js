//Falta el JWT
import { Pedido } from "../models/Pedido.js";

// Se crea cuando se ingresa un detalle (más infromación en detallePedidos.js)
export const actualizarPedido = async(req,res) =>{
    const {id}=req.params;
    const {usuarioId} = req.body;
     //const usuarioId = req.user.id;
    const pedido = await Pedido.findOne({
        where:{
            id,
            usuarioId,
            estado: "Carrito"
        }
    });
    if(!pedido)
        return res.status(404).send({message:"No se encontró pedido pendiente con el ID especificado"});
    
    // Actualizar de estado Carrito a Finalizado
    pedido.estado = "Finalizado"
    await pedido.save();
    res.json(pedido);
}
export const eliminarPedido = async(req,res) =>{
    const {id} = req.params;
    const { usuarioId } = req.body;
     //const usuarioId = req.user.id;
    const pedido = Pedido.findOne({
        where:{
            id,
            usuarioId,
            estado: "Carrito"
        }
    });
    if(!pedido)
        return res.status(404).send({message:"No se encontró pedido pendiente con el ID especificado"});

    await pedido.destroy();

    res.status(200).send({
        message: "Pedido eliminado correctamente"
    });
}