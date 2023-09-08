import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql'
    });
//comprobar la conexión a la base de datos
    (async () => {
        try {
          await sequelize.authenticate();
          console.log('Conexión exitosa a la base de datos.');
    
        } catch (error) {
          console.error('Error al conectar a la base de datos:', error);
        }
      })();