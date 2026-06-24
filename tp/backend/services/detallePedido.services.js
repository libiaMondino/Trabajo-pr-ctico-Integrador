// VER LO DE JWT 
import { DetallePedido } from "../models/DetallePedido.js";
import { Producto } from "../models/Producto.js";
import { Pedido } from "../models/Pedido.js";
// 1 Pedido = 1 carrito
// 1 Detalle Pedido = 1 Producto dentro del carrito

export const crearDetallePedido= async(req,res) =>{{
    try{
    const { productoId, cantidad} = req.body;
    const usuarioId = req.user.id;
    let newDetalle;
    let pedidoIdFinal;

    //Validaciones
    if ( !cantidad || cantidad < 0)
        return res.status(400).send({message:"Cantidad debe ser mayor a cero"});
    
    const prod = await Producto.findByPk(productoId);
    if(!prod)
        return res.status(404).send({message: "No se encontró el producto"});
    
    //Subtotal con el descuento 
    const precio = Number(prod.price);
    const descuento = Number(prod.percentageDiscount);
    const subtotal = (precio * cantidad) - (precio * cantidad * (descuento/100) );

    const pedido = await Pedido.findOne({
        where:{
            usuarioId,
            estado: "Carrito" // Porque se supone que hay un solo pedido en estado Carrito por usuario
        }
    });

    if(pedido){
        pedidoIdFinal = pedido.id; 
        //Se verifica si ya está el detalle en el pedido existente
        const existeDetalle = await DetallePedido.findOne({
            where:{
            pedidoId: pedidoIdFinal,
            productoId
            //usuarioId
            }
        })
        if(existeDetalle)
            return res.status(400).send({message:"El producto ya está ingresado en el pedido"});
        //Si no existe, se cambia el total del pedido
        pedido.total = Number(pedido.total) + subtotal;
        await pedido.save();

    } else{
        const newPedido = await Pedido.create({
        usuarioId,
        total : subtotal
        })
        pedidoIdFinal = newPedido.id;
    } 

    // se crea detalle
    newDetalle = await DetallePedido.create({
    pedidoId: pedidoIdFinal,
    productoId,
    //usuarioId,
    cantidad,
    subtotal
    });
    res.json(newDetalle);
} catch(error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.errors);
    console.log(error.parent);

    return res.status(500).json(error.message + error.parent + error.name + error.errors );
  }
}};

export const actualizarDetallePedido = async(req,res) => {
    try{
    const {pedidoId, productoId, cantidad} = req.body;
    const usuarioId = req.user.id;
    //Validaciones
    if (!pedidoId || !productoId) 
        return res.status(400).send({ message: "Faltan id pedido o id producto" });
    
    if ( !cantidad || cantidad<0)
        return res.status(400).send({message:"Cantidad debe ser mayor a cero"});
    
    const pedido = await Pedido.findOne({
        where:{
            id: pedidoId,
            usuarioId,
            estado: "Carrito" // Porque se supone que hay un solo pedido en estado Carrito por usuario
        }
    });
    if (!pedido)
        return res.status(404).send({ message: "Pedido no encontrado"});

    const detalleEncontrado = await DetallePedido.findOne({
        where:{
            pedidoId,
            productoId,
        }
    })
    if(!detalleEncontrado)
        return res.status(404).send({message:"Detalle no encontrado"});

    const productoEncontrado= await Producto.findByPk(productoId);
    if(!productoEncontrado)
        return res.status(404).send({message:"Producto no encontrado"});

    //Cálculo Subtotal
    const precio = Number(productoEncontrado.price);
    const descuento = Number(productoEncontrado.percentageDiscount);
    const newSubtotal = (precio * cantidad) - (precio * cantidad * (descuento/100) ); 

    pedido.total = Number(pedido.total) - Number(detalleEncontrado.subtotal) + newSubtotal;
    await pedido.save();

    // Actualización Detalle
    await detalleEncontrado.update({
        cantidad,
        subtotal: newSubtotal,
    })
    await detalleEncontrado.save();

    res.json(detalleEncontrado);} catch(error){
         console.log(error.name);
    console.log(error.message);
    console.log(error.errors);
    console.log(error.parent);

    return res.status(500).json(error.message + error.parent + error.name + error.errors );
    }
};

export const eliminarDetallePedido = async(req,res) => {
    const { pedidoId, productoId} = req.body;
    const usuarioId = req.user.id;
    //Validaciones
    if (!pedidoId || !productoId) 
        return res.status(400).send({ message: "Faltan id pedido o id producto" });

    const pedido = await Pedido.findOne({where:{id:pedidoId, estado:"Carrito"}});
    if (!pedido)
        return res.status(404).send({ message: "Pedido abierto no encontrado"});

    const detalleEncontrado = await DetallePedido.findOne({
        where:{
            pedidoId,
            productoId
        }
    })
    if(!detalleEncontrado) 
        return res.status(404).send({message: "Producto no encontrado en el pedido"});

    pedido.total= Number(pedido.total) - Number(detalleEncontrado.subtotal);
    await pedido.save();
    await detalleEncontrado.destroy();

    res.send({message:`Producto id: ${productoId} eliminado con éxito del pedido`});
}