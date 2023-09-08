import express from 'express';

const router = express.Router();

//APIS
router.get('/',(req,res)=>{
    res.json('Funcionando')
});

export default router;