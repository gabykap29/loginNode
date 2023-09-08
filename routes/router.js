import express from 'express';
import crtlUsers from '../controllers/user.controller.js'
import crtlAuth from '../controllers/auth.controller.js'
import authCtrl from '../controllers/auth.controller.js';
const router = express.Router();

router.get('/',(req,res)=>{
    res.json('Funcionando')
});


//APIS
router.post('/api/register',crtlUsers.create);
router.post('/api/login',authCtrl.login);


export default router;