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