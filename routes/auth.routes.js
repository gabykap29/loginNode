import express from 'express';
import crtlUsers from '../controllers/user.controller.js'
import crtlAuth from '../controllers/auth.controller.js'
import authCtrl from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validateSchema } from '../middlewares/validateSchema.js';
const router = express.Router();

router.get('/',(req,res)=>{
    res.json('Funcionando')
});


//APIS

//register
router.post('/api/register',
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
]),crtlUsers.create);

//login
router.post('/api/login',
validateSchema([
    body('email').notEmpty().withMessage('El campo email es obligatorio!')
    .isEmail().withMessage('El correo no es válido!')
    ,
    body('pass').notEmpty().withMessage('El campo pass es obligatorio!')
]),
authCtrl.login);


export default router;