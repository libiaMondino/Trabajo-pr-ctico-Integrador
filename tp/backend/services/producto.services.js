import { Producto } from "../models/Producto.js";

export const encontrarProductos = async (req, res) => {
    try {
        const { categoria } = req.params;

        let productos;

        if (categoria) {
            productos = await Producto.findAll({
                where: { category: categoria }
            });
        } else {
            productos = await Producto.findAll();
        }

        res.json(productos);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const encontrarProducto = async (req, res) => {
    try {
        const { id, categoria } = req.params;

        let prod;

        if (categoria) {
            prod = await Producto.findOne({
                where: {
                    id,
                    category: categoria
                }
            });
        } else {
            prod = await Producto.findByPk(id);
        }

        if (!prod) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        res.json(prod);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const crearProducto = async (req, res) => {
    try {
        const {
            name,
            type,
            brand,
            category,
            rating,
            imgUrl,
            price,
            percentageDiscount,
            stock,
            description
        } = req.body;

        const categoriasValidas = ["Música", "Audio"];

        if (!name || !type || !brand || price === undefined) {
            return res.status(400).json({
                message: "Los campos nombre, tipo, marca y precio son obligatorios"
            });
        }

        if (!categoriasValidas.includes(category)) {
            return res.status(400).json({
                message: "Categoría inválida"
            });
        }

        if (price < 0) {
            return res.status(400).json({
                message: "El precio no puede ser menor a cero"
            });
        }

        if (stock < 0) {
            return res.status(400).json({
                message: "El stock no puede ser menor a cero"
            });
        }

        const available = stock > 0;

        const nuevoProd = await Producto.create({
            name,
            type,
            brand,
            category,
            rating,
            imgUrl,
            available,
            price,
            percentageDiscount,
            stock,
            description
        });

        res.status(201).json(nuevoProd);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const prod = await Producto.findByPk(id);

        if (!prod) {
            return res.status(404).json({
                message: "No se encontró producto"
            });
        }

        const {
            name,
            type,
            brand,
            category,
            rating,
            imgUrl,
            price,
            percentageDiscount,
            stock,
            description
        } = req.body;

        const categoriasValidas = ["Música", "Audio"];

        if (category && !categoriasValidas.includes(category)) {
            return res.status(400).json({
                message: "La categoría ingresada no es válida"
            });
        }

        if (price !== undefined && price < 0) {
            return res.status(400).json({
                message: "El precio no puede ser menor a cero"
            });
        }

        if (stock !== undefined && stock < 0) {
            return res.status(400).json({
                message: "El stock no puede ser menor a cero"
            });
        }

        if (name !== undefined) prod.name = name;
        if (type !== undefined) prod.type = type;
        if (brand !== undefined) prod.brand = brand;
        if (category !== undefined) prod.category = category;
        if (rating !== undefined) prod.rating = rating;
        if (imgUrl !== undefined) prod.imgUrl = imgUrl;
        if (price !== undefined) prod.price = price;
        if (percentageDiscount !== undefined) prod.percentageDiscount = percentageDiscount;
        if (description !== undefined) prod.description = description;

        if (stock !== undefined) {
            prod.stock = stock;
            prod.available = stock > 0;
        }

        await prod.save();

        res.json(prod);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const prod = await Producto.findByPk(id);

        if (!prod) {
            return res.status(404).json({
                message: "No se encontró el producto"
            });
        }

        await prod.destroy();

        res.json({
            message: `Producto id ${id} eliminado correctamente`
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};