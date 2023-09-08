import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import router from './routes/router.js'
dotenv.config();
const index = express();

const accessLogStream = fs.createWriteStream('access.log',{flags:'a'});

index.use(express.json());
index.use(helmet());
index.use(morgan('combined',{stream:accessLogStream}));
index.use(cors());
index.use(router)
const PORT = process.env.PORT || 3000;

index.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});


