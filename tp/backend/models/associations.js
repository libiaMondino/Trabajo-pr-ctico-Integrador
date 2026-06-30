import { Usuario } from "./Usuario.js";
import { Pedido } from "./Pedido.js";
import { Review } from "./Review.js";
import { DetallePedido } from "./DetallePedido.js";
import { Producto } from "./Producto.js";

Usuario.hasMany(Pedido, {
    foreignKey: "usuarioId"
});

Pedido.belongsTo(Usuario, {
    foreignKey: "usuarioId"
});

Usuario.hasMany(Review, {
    foreignKey: "usuarioId"
});

Review.belongsTo(Usuario, {
    foreignKey: "usuarioId"
});

Pedido.hasMany(DetallePedido, {
    foreignKey: "pedidoId",
});

DetallePedido.belongsTo(Pedido, {
    foreignKey: "pedidoId",
});

Producto.hasMany(DetallePedido, {
    foreignKey: "productoId",
});

DetallePedido.belongsTo(Producto, {
    foreignKey: "productoId",
});