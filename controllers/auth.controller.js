import User from '../models/Users.js';
import bcrypt from 'bcryptjs'
import {generateJWT} from '../helpers/generateJWT.js';
const authCtrl = {};

authCtrl.login = async (req,res)=>{
    const {username,pass} = req.body;

    try {
        const user = await User.findOne({
            where:{
                username:username
            }
        });
        if(!user){
            return res.status(401).json({
                message: 'Verifique el usuario y/o contraseña ingresada!'
            });
        };
        const passIsValid = bcrypt.compareSync(pass,user.pass);

        if(!passIsValid){
            return res.status(401).json({
                message: 'Verifique el usuario y/o contraseña ingresada!'
            });
        }

        const token = await generateJWT(user.idUser,user.rol);
        res.json({
            message:'Login Correcto!',
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Error interno del servidor'
        });
    }
};

export default authCtrl;