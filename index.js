import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

//importación de rutas
import router from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js';

dotenv.config();
const index = express();

const accessLogStream = fs.createWriteStream('access.log',{flags:'a'});
//midlewares a utilizar
index.use(express.json());
index.use(helmet());
index.use(morgan('combined',{stream:accessLogStream}));
index.use(cors());
index.use(router)
index.use(userRoutes)
const PORT = process.env.PORT || 3000;
//servidor en marcha
index.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});


