/*AGREGAR:
*Hasheo de password
*Generar validación para el cambio de rol(que sea solo el superadmin)
*/

// importar el modelo de la base de datos

export const crearUsuario = async (req,res) => {
    const { name, email, password} = req.body;
   
    // Validaciones
    
    if (!name|| !email || !password){
       return res.status(400).send("Nombre, email y contraseña son campos requeridos");
    };
    if(!/\S+@\S+\.\S+/.test(email)){
        return res.status(400).send("Email no válido");
    };
    if(password.length < 8){
        return res.status(400).send("La contraseña debe tener al menos 8 caracteres");
    };

    const hayEmailDuplicado = await Usuario.findOne({ where: { email: email}});
    if(hayEmailDuplicado) return res.status(409).send("Usuario ya registrado");

    //+++++Hay que harshear el password+++++

    const newUsuario = await Usuario.create({
        name,
        email,
        password
        // Sequelize le asigna como default el rol: usuario
    });
    
    res.json(newUsuario);
}

export const actualizarUsuario = async (req,res) => {
    const { id } = req.params;
    const { name, email, password, role} = req.body;

    // Encontrar usuario
    const user = await Usuario.findByPk(id);

    // Validaciones
    if (!user) return res.status(404).send("Usuario no encontrado");
    if (!name|| !email || !password) return res.status(400).send("Nombre, email y contraseña son campos requeridos");
    if(!/\S+@\S+\.\S+/.test(email)) return res.status(400).send("Email no válido")
    if(password.length < 8) return res.status(400).send("La contraseña debe tener al menos 8 caracteres")
    
    //Actualizar
    await user.update({
        name,
        email,
        password,
        role
    });

    await user.save();

    res.json(user);

};

export const eliminarUsuario = async (req,res) =>{
    const { id } = req.params;
    
    //Encontrar Usuario
    const user = await Usuario.findByPk(id);

    if(!user){
        return res.status(404).send("No se encontró el usuario");
    }

    //Se elimina usuario
    await user.destroy();

    res.send(`Usuario id: ${id} fue eliminado con éxito`);

};