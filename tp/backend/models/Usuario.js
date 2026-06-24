//FALTA JWT 
import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase.js";
export const Usuario = sequelize.define("usuario",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password:{
        //Capaz mejor tipo text
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[8,100]
        }
    },
    role:{
        type: DataTypes.ENUM("usuario","admin","super_admin"),
        defaultValue: "usuario",
        allowNull: false
    }
})