import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase.js";
import { Usuario } from "./Usuario.js";

export const Pedido = sequelize.define("pedido",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        // Es foreign Key
        references:{
            model: Usuario,
            key: "id"
        }
    },
    estado:{
        type: DataTypes.STRING,
        defaultValue: "Carrito",
        validate: {
            isIn: {
                args: [["Carrito", "Finalizado"]]
            }
        }
    },
    fecha:{
        type: DataTypes.DATE,
        // Se guarda la fecha actual, al momento de crear pedido
        defaultValue: DataTypes.NOW
    },
    total:{
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
        validate:{
            min: 0
        }
    }
})