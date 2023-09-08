import bcrypt from 'bcryptjs';
import  User  from '../models/User.js';
//crear un objeto para utilizar funciones como propiedades, con el fin de exportar solo el objeto
export const crtlUsers = {};
//crear un usuario
crtlUsers.create = async (req,res)=>{
    const { name, lastname,username, pass} = req.body;
    //primero, busca si el usuario no esta existente en la base de datos
    try {
        
        const userExist = await User.findOne({
            where:{
                username,
            },
        });
        //si existe, devuelve un error 400
        if (userExist){
            throw{
                status:400,
                message:'El usuario ya se encuentra en Base de datos',
            };
        }
        // encriptar contraseña
        const salt = await bcrypt.genSalt(8);
        const encriptpass = await bcrypt.hash(pass,salt);
        //crear el usuario
        const newUser = await User.create({
            lastname,
            name,
            username,
            pass: encriptpass,
        });
        if(!newUser){
            throw({
                status:400,
                message:'Error, el usuario no se ha creado!'
            });
        }
        //si todo sale bien, devuelve un status 201
        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error Interno del Servidor!'
        });
    };
};
//Obtener un unico usuario
crtlUsers.findOne = async (req,res)=>{
    const {id}= req.params;
    try {
        const user = await User.findOne({
            
            where:{
                idUser:id
            },
        });
        if(!user){
            throw({
                status:404,
                message: 'El usuario no existe en base de datos!'
            });
        };
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor!'
        });        
    };
};

crtlUsers.findAll = async(req,res)=>{
    try {
        //buscar todos los usuarios que no hayan sido "borrados"
        const Users = await User.findAll({
            attributes:{exclude:['pass']},
            where:{
                state:true,
            }
        });
        //si no hay usuarios cargados, devuelve un 404
        if(!Users){
            throw({
                status:404,
                message:'No hay usuarios cargados en base de datos'
            });
        };
        return res.status(200).json(Users);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message:  error.message || 'Error interno del Servidor'
        });
    };
};
//actualizar un usuario
crtlUsers.updateOne = async(req,res)=>{
    const {id}=req.params;
    const {lastname,name,username,pass} = req.body;

    //si el usuario quiere actualizar su contraseña
    let passEncript;
    if(pass){
        const salt = await bcrypt.genSalt(8);
        passEncript = await bcrypt.hash(pass,salt);
    };
    try {
        //actualizar usuario
        const userUpdate =  await User.update({
            lastname,
            name,
            username,
            pass:  passEncript,
        },{
            where:{
                idUser:id,
                state:true
            }
        });
        //si no se logró actualizar, mostrar error 400
        if(!userUpdate){
            throw({
                status:400,
                message:'Error al actualizar el usuario!'
            });
        };
        //si todo sale bien,  retorna un codigo 201
        return res.status(201).json({
            message:'Usuario actualizado con éxito!',
            userUpdate,
        });
    } catch (error) {
        console.log(error);
        return res.status(error.message || 500).json({
            message:'error interno del servidor!'
        });
    };
};
//Eliminar un usuario (metodo lógico)
crtlUsers.userDelete=async(req,res)=>{
    const {id} = req.params;
    try {
        const user = await User.findOne({
            where:{
                idUser:id,
                state:true,
            },
        });
        if(!user){
            throw({
                status:404,
                message:'El usuario no existe en base de datos o ya fue eliminado!'
            });
        };
        const userDelete = await User.update(
            {
            status:false,
        },
        {
            where:{
                    id
                }
    });
    return res.status(201).json({
        message:'Usuario Eliminado con éxito',
    });
    } catch (error) {
       console.log(error);
       res.status(error.status || 500).json({message: error.message||'Error  interno del servidor!'}); 
    }
};