import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase.js";
import { Pedido } from "./Pedido.js";
import { Producto } from "./Producto.js";

export const DetallePedido = sequelize.define("detallePedido", {
  pedidoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Pedido,
      key: "id",
    },
    onDelete: "CASCADE",
  },

  productoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Producto,
      key: "id",
    },
    onDelete: "RESTRICT",
  },

  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },

  
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});