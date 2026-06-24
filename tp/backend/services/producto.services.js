import { Producto } from "../models/Producto.js";

export const encontrarProductos = async (req,res) => {
    const { categoria }= req.params;
    let productos;
    if (categoria) {
        productos = await Producto.findAll({ where: { category : categoria}});
    } else{
        productos = await Producto.findAll();
    };
    
    res.json(productos);
};

export const encontrarProducto = async(req, res) => {
    const { id, categoria} = req.params;
    let prod;

    if (categoria){
        prod = await Producto.findOne({ where: { id: id, category:categoria}});
    } else{
        prod = await Producto.findOne({ where: { id: id }});
    }

    if (!prod){
        return res.status(404).send({ message: "Producto no encontrado"});
    }
    res.json(prod);
};

export const crearProducto = async(req, res)=> {
    console.log("Entro a la ruta");
    const { name, type, brand, category, rating, imgUrl, price, percentageDiscount, stock, description} = req.body;
    let available;
    const categoriasValidas= ["Música","Audio"];
    
    //Validaciones
    if (!name || !type || !brand || !price)
        return res.status(400).send({message: "Los campos nombre, tipo, marca y precio son obligatorios"})
    
    if(stock < 0)
        return res.status(400).send({message: "Stock no puede ser menor a cero"})
    
    if(!categoriasValidas.includes(category))
        return res.status(400).send({message: "La categoría ingresada no corresponde a una categoría válida"});
    
    if(precio < 0)
        return res.status(400).send({message: "El precio no puede ser menor a cero"});

    //Coherencia entre available y stock
    if (stock > 0) { available = true } 
        else{ available = false}
    
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
    })
    res.json(nuevoProd);
};

export const actualizarProducto = async(req, res) => {
    
    //Validación existencia
    const { id } = req.params;
    const prod= await Producto.findByPk(id);
    if(!prod)
        return res.status(404).send({message:"No se encontró producto"});

    const { name, type, brand, category, rating, imgUrl, price, percentageDiscount, stock, description }=req.body;
    let disponible;
    const categoriasValidas= ["Música","Audio"];
    
    //Validaciones sólo si ingresan esos datos
    if (stock !== undefined)
        if (stock < 0)
            return res.status(400).send({message: "Stock no puede ser menor a cero"})
        if(stock === 0)
            disponible = false;
        else 
            disponible = true;

    if(category && !categoriasValidas.includes(category))
        return res.status(400).send({message: "La categoría ingresada no corresponde a una categoría válida"});
    
    if(price !== undefined && price < 0)
        return res.status(400).send({message: "El precio no puede ser menor a cero"});
    
    // Actualización parcial
    if (name !== undefined) prod.name = name;
    if (type !== undefined) prod.type = type;
    if (brand !== undefined) prod.brand = brand;
    if (category !== undefined) prod.category = category;
    if (rating !== undefined) prod.rating = rating;
    if (imgUrl !== undefined) prod.imgUrl = imgUrl;
    if (price !== undefined) prod.price = price;
    if (percentageDiscount !== undefined) prod.percentageDiscount = percentageDiscount;
    if (stock !== undefined){
        prod.stock = stock; 
        prod.available = disponible;
    } 
    if (description !== undefined) prod.description = description;

    await prod.save();

    res.json(prod);
};

export const eliminarProducto = async (req,res) =>{
    const { id } = req.params;
    const prod = await Producto.findByPk(id);
    if(!prod)
        return res.status(404).send({message: "No se encontró el producto"});

    await prod.destroy();

    res.send(`Producto id: ${id} fue eliminado con éxito`);
};

