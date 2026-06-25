import { Usuario } from "./Usuario.js";
import { Pedido } from "./Pedido.js";
import { Review } from "./Review.js";

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