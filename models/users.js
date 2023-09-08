//importar SEQUELIZE desde el archivo db de la conexión
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.js";

//roles
export const role = {
    ADMIN:'admin',
    USER: 'user'
} 
///modelo de usuarios
const User =  sequelize.define('User',{
    idUser:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    pass:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    rol:{
        type:DataTypes.ENUM(role.ADMIN,role.USER),
        defaultValue: role.USER
    },
    state:{
        type: DataTypes.BOOLEAN, 
        defaultValue:true
    },
},
{
    sequelize,
    paranoid:true,
    modelName: 'User',
    tableName:'Users',
});
    // Sincroniza el modelo Users con la base de datos
    
  User.sync();

  
export default User;