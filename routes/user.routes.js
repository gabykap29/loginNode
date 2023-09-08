import express from 'express';
import crtlUsers from '../controllers/user.controller.js'
import crtlAuth from '../controllers/auth.controller.js'
import authCtrl from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validateSchema } from '../middlewares/validateSchema.js';

const userRoutes = express.Router();


userRoutes.get('/api/users',crtlUsers.findAll);
userRoutes.get('/api/users/:id',crtlUsers.findOne);


userRoutes.put('/api/user/edit',
//validaciones
validateSchema([
    body('lastname').notEmpty().withMessage('El apellido es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').notEmpty().withMessage('El título es obligatorio')
    .isEmail()
    ,
    body('pass')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[A-Z])/).withMessage('La contraseña debe contener al menos una letra mayúscula'),
]),crtlUsers.updateOne);

//Eliminar (metodo logico)
userRoutes.put('/api/user/delete/:id', crtlUsers.userDelete);

export default userRoutes;