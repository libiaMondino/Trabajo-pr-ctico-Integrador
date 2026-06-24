import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase.js";
import { Usuario } from "./Usuario.js";
import { Producto } from "./Producto.js";

export const Review = sequelize.define("review", {
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
    productoId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Producto,
            key: "id"
        }
    },
    estrellasCant:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1 ,
        validate:{
            min: 1,
            max: 5
        }
    },
    reviewTexto:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
})