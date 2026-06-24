import { Pedido } from "../models/Pedido.js";

export const crearPedido = async(req,res) => {
    const { id, usuarioId} = req.body;
    if(!id || !usuarioId)
        return res.status().send({message:""});

    const existe = await Pedido.findByPk(id);
    if(existe)
        return res.status(400).send({message: "Ya existe el pedido con el id ingresado"});

    const 
    const newPedido = await Pedido.create({
        id,
        usuarioId,
        //fecha definida por default en Sequelize
        
    })
    
}