import { DetallePedido } from "../models/DetallePedido.js";
import { Producto } from "../models/Producto.js";
import { Pedido } from "../models/Pedido.js";


export const crearDetallePedido = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    const usuarioId = req.user.id;

    if (!cantidad || cantidad < 1)
      return res.status(400).send({ message: "Cantidad debe ser mayor a 0" });

    const prod = await Producto.findByPk(productoId);
    if (!prod)
      return res.status(404).send({ message: "Producto no encontrado" });

    const precio = Number(prod.price);
    const descuento = Number(prod.percentageDiscount);
    const subtotal = (precio * cantidad) - (precio * cantidad * (descuento / 100));

    let pedido = await Pedido.findOne({
      where: { usuarioId, estado: "Carrito" },
    });

    if (!pedido) {
      pedido = await Pedido.create({
        usuarioId,
        total: 0,
      });
    }

    let detalle = await DetallePedido.findOne({
      where: { pedidoId: pedido.id, productoId },
    });

    if (detalle) {
      
      const nuevaCantidad = detalle.cantidad + cantidad;

      const nuevoSubtotal =
        (precio * nuevaCantidad) - (precio * nuevaCantidad * (descuento / 100));

      pedido.total =
        Number(pedido.total) - Number(detalle.subtotal) + nuevoSubtotal;

      await detalle.update({
        cantidad: nuevaCantidad,
        subtotal: nuevoSubtotal,
      });

    } else {
      detalle = await DetallePedido.create({
        pedidoId: pedido.id,
        productoId,
        cantidad,
        subtotal,
      });

      pedido.total = Number(pedido.total) + subtotal;
    }

    await pedido.save();

    return res.json(detalle);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};


export const actualizarDetallePedido = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    const usuarioId = req.user.id;

    if (!cantidad || cantidad < 1)
      return res.status(400).send({ message: "Cantidad inválida" });

    const pedido = await Pedido.findOne({
      where: { usuarioId, estado: "Carrito" },
    });

    if (!pedido)
      return res.status(404).send({ message: "Pedido no encontrado" });

    const detalle = await DetallePedido.findOne({
      where: { pedidoId: pedido.id, productoId },
    });

    if (!detalle)
      return res.status(404).send({ message: "Producto no encontrado en carrito" });

    const producto = await Producto.findByPk(productoId);

    const precio = Number(producto.price);
    const descuento = Number(producto.percentageDiscount);

    const nuevoSubtotal =
      (precio * cantidad) - (precio * cantidad * (descuento / 100));

    pedido.total =
      Number(pedido.total) - Number(detalle.subtotal) + nuevoSubtotal;

    await detalle.update({
      cantidad,
      subtotal: nuevoSubtotal,
    });

    await pedido.save();

    return res.json(detalle);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 🔴 ELIMINAR DEL CARRITO
 */
export const eliminarDetallePedido = async (req, res) => {
  try {
    const { productoId } = req.body;
    const usuarioId = req.user.id;

    const pedido = await Pedido.findOne({
      where: { usuarioId, estado: "Carrito" },
    });

    if (!pedido)
      return res.status(404).send({ message: "Carrito no encontrado" });

    const detalle = await DetallePedido.findOne({
      where: { pedidoId: pedido.id, productoId },
    });

    if (!detalle)
      return res.status(404).send({ message: "Producto no está en el carrito" });

    pedido.total = Number(pedido.total) - Number(detalle.subtotal);

    await detalle.destroy();
    await pedido.save();

    return res.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};