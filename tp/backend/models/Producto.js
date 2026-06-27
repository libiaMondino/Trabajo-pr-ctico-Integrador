import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase.js";

export const Producto = sequelize.define("producto", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    type:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    brand:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    category:{
        type: DataTypes.ENUM("Audio", "Musica"),
        validate: {
            isIn: {
                args: [["Musica", "Audio"]]
            }
        }
    }, 
    rating:{
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        validate:{
            min: 0,
            max: 5
        }
    }, 
    imgUrl:{
        type: DataTypes.STRING
    }, 
    available:{
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    }, 
    price:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            min:0
        }
    }, 
    percentageDiscount:{
        type: DataTypes.DECIMAL,
        defaultValue:0,
        validate: {
            min: 0,
            max: 100
        }
    }, 
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min:0
        }
    }, 
    description:{
        type: DataTypes.TEXT
    }
})