import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase.js";
import { Usuario } from "./Usuario.js";

export const Pedido = sequelize.define("pedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id",
    },
    onDelete: "CASCADE",
  },

  estado: {
    type: DataTypes.STRING,
    defaultValue: "Carrito",
    validate: {
      isIn: {
        args: [["Carrito", "Finalizado"]],
        msg: "Estado inválido",
      },
    },
  },

  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});