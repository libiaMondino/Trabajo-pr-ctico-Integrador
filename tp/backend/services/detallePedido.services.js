import { DetallePedido } from "../models/DetallePedido.js";
import { Producto } from "../models/Producto.js";
import { Pedido } from "../models/Pedido.js";
import { Usuario } from "../models/Usuario.js";
// 1 Pedido = 1 carrito
// 1 Detalle Pedido = 1 Producto dentro del carrito

export const crearDetallePedido= async(req,res) =>{
    const { pedidoId, usuarioId, productoId, cantidad} = req.body;
    let newDetalle;

    //Validaciones
    if ( !cantidad || cantidad < 0)
        return res.status(400).send({message:"Cantidad debe ser mayor a cero"});
    
    const usuario = await Usuario.findByPk(usuarioId);
    if(!usuario)
        return res.status(404).send({message: "No se encontró el usuario"});
    
    const prod = await Producto.findByPk(productoId);
    if(!prod)
        return res.status(404).send({message: "No se encontró el producto"});
    
    //PercentageDis
    //const subtotal = (prod.price * cantidad) - (prod.price * cantidad * );

    const pedido = await Pedido.findByPk(pedidoId);
    if(pedido){
        //Se verifica si ya está el detalle en el pedido existente
        const existeDetalle = await DetallePedido.findOne({
            where:{
            pedidoId,
            productoId,
            usuarioId
            }
        })
        if(existeDetalle)
            return res.status(400).send({message:"El producto ya está ingresado en el pedido"});
        //Si no existe, se cambia el total del pedido
        pedido.total = pedido.total + subtotal;
        await pedido.save();

    } else{
        const newPedido = await Pedido.create({
        usuarioId,
        total : subtotal
        })
        pedidoId = newPedido.id;
    } 

    // se crea detalle
    newDetalle = await DetallePedido.create({
    pedidoId,
    productoId,
    usuarioId,
    cantidad,
    subtotal
    });
    res.json(newDetalle);
};

export const actualizarDetallePedido = async(req,res) => {
    const {pedidoId, productoId, cantidad} = req.body;

    //Validaciones
    if (!pedidoId || !productoId) 
        return res.status(400).send({ message: "Faltan id pedido o id producto" });
    
    if ( !cantidad || cantidad<0)
        return res.status(400).send({message:"Cantidad debe ser mayor a cero"});

    const detalleEncontrado = await DetallePedido.findOne({
        where:{
            pedidoId,
            productoId
        }
    })
    if(!detalleEncontrado)
        return res.status(404).send({message:"Detalle no encontrado"});

    const productoEncontrado= await Producto.findByPk(productoId);
    if(!productoEncontrado)
        return res.status(404).send({message:"Producto no encontrado"});


    const newSubtotal = cantidad * productoEncontrado.price; 

    await detalleEncontrado.update({
        cantidad,
        subtotal: newSubtotal,
    })
    await detalleEncontrado.save();

    res.json(detalleEncontrado);
};

export const eliminarDetallePedido = async(req,res) => {
    const { pedidoId, productoId} = req.body;
    
    if (!pedidoId || !productoId) 
        return res.status(400).send({ message: "Faltan id pedido o id producto" });
    
    const detalleEncontrado = await DetallePedido.findOne({
        where:{
            pedidoId,
            productoId
        }
    })
    if(!detalleEncontrado) 
        return res.status(404).send({message: "Producto no encontrado en el pedido"});

    await detalleEncontrado.destroy();

    res.send({message:`Producto id: ${productoId} eliminado con éxito del pedido`});
}