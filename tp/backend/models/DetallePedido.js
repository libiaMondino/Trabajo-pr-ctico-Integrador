import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase.js";
import { Pedido } from "./Pedido.js";
import { Producto } from "./Producto.js";

export const DetallePedido = sequelize.define("detallePedido", {
    pedidoId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Pedido,
            key:"id"
        }
        //onDelete: CASCADE
        //onUpdate: CASCADE
    },
    productoId:{
        type: DataTypes.INTEGER,
        // Al poner primary key en productoId y pedidoID evita que en un mismo pedido haya producto repetido
        primaryKey: true, 
        references:{
            model: Producto,
            key: "id"
        }
        //onDelete: RESTRICT
        //onUpdate: CASCADE
    },
    cantidad:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate:{
            min:1
        }
    },
    subtotal:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue:0,
        validate:{
            min:0
        }
    }
})