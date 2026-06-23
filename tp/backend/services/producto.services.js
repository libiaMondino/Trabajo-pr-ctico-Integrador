import { Producto } from "../models/Producto";

export const encontrarProductos = async (req,res) => {
    const { categoria }= req.params;
    if (categoria) {
        const productos = await Producto.findAll({ where: { category : categoria}});
    } else{
        const productos = await Producto.findAll();
    };
    
    res.json(productos);
};

export const encontrarProducto = async(req, res) => {
    const { id, categoria} = req.params;
    if (categoria){
        const prod = await Producto.findOne({ where: { id: id, category:categoria}});
    } else{
        const prod = await Producto.findOne({ where: { id: id, }});
    }
    

    if (!prod){
        res.status(404).send({ message: "Producto no encontrado"});
    }
    res.json(prod);
};

export const crearProducto = async(req, res)=> {
    const { name, type, brand, category, rating, imgUrl, available, price, percentageDiscount, stock, description} = req.body;
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
    //Validar que available y stock sean coherentes
    res.json(nuevoProd);
};

export const actualizarProducto = async(req, res) => {
    const { id } = req.params;
    const { name, type, brand, category, rating, imgUrl, available, price, percentageDiscount, stock, description }=req.body;

    //Encontrar producto
    const prod = await Producto.findByPk(id);
    
    //Actualizarlo
    await prod.update({
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

    await prod.save();

    res.json(prod);
};

export const eliminarProducto = async (req,res) =>{
    const { id } = req.params;
    const prod = await Producto.findByPk(id);

    await prod.destroy();

    res.send(`Producto id: ${id} fue eliminado con éxito`);
};

