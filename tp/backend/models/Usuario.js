import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase.js";

export const Usuario = sequelize.define("usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100]
        }
    },

    role: {
        type: DataTypes.ENUM("usuario", "admin", "super_admin"),
        allowNull: false,
        defaultValue: "usuario"
    }
}, {
    timestamps: true
});