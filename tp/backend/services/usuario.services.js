import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const crearUsuario = async (req, res) => {
    const { name, email, password } = req.body;

    // Validaciones
    if (!name || !email || !password)
        return res.status(400).send({
            message: "Nombre, email y contraseña son campos requeridos"
        });

    if (!/\S+@\S+\.\S+/.test(email))
        return res.status(400).send({
            message: "Email no válido"
        });

    if (password.length < 8)
        return res.status(400).send({
            message: "La contraseña debe tener al menos 8 caracteres"
        });

    const hayEmailDuplicado = await Usuario.findOne({
        where: { email }
    });

    if (hayEmailDuplicado)
        return res.status(409).send({
            message: "Usuario ya registrado"
        });

    // 🔐 HASH DE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUsuario = await Usuario.create({
        name,
        email,
        password: hashedPassword
    });

    return res.status(201).json(newUsuario);
};

export const actualizarUsuario = async (req,res) => {
    const { id } = req.params;
    const { name, email, password, role} = req.body;

    // Encontrar usuario
    const user = await Usuario.findByPk(id);

    // Validaciones
    if (!user) 
        return res.status(404).send({message: "Usuario no encontrado"});

    if(email && !/\S+@\S+\.\S+/.test(email)) 
        return res.status(400).send({message: "Email no válido"});
    
    if(password && password.length < 8) 
        return res.status(400).send({message: "La contraseña debe tener al menos 8 caracteres"})
    
    if(role && req.user.role !== "super_admin") 
        return res.status(403).send({message: "No tenés permisos para modificar este campo"});

    //Actualización parcial
    if(name) user.name = name;
    if(email) user.email = email;
    if(password) user.password = await bcrypt.hash(password,10);
    if(role) user.role = role;

    await user.save();

    res.json(user);

};

export const eliminarUsuario = async (req,res) =>{
    const { id } = req.params;
    
    //Encontrar Usuario
    const user = await Usuario.findByPk(id);

    if(!user){
        return res.status(404).send({message: "No se encontró el usuario" });
    }

    //Se elimina usuario
    await user.destroy();

    res.send({message: `Usuario id: ${id} fue eliminado con éxito`});

};

export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password) {
        return res.status(400).send({
            message: "Email y contraseña son requeridos"
        });
    }

    // Buscar usuario
    const user = await Usuario.findOne({
        where: { email }
    });

    if (!user) {
        return res.status(404).send({
            message: "Usuario no encontrado"
        });
    }

    // Comparar password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).send({
            message: "Contraseña incorrecta"
        });
    }

    // 🔐 GENERAR TOKEN
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        "CLAVE_SECRETA", // después la pasamos a .env
        { expiresIn: "1h" }
    );

    return res.json({
        message: "Login exitoso",
        token
    });
    console.log(user.role);
};