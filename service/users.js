const {connAttrs} = require("../utils/connection");
const { response } = require('express')
const oracledb = require('oracledb');

const getConnectionInstance = async()=>{
  return await oracledb.getConnection(connAttrs);
}

const listUsers = async (req, res) => {
    try{
        const connection = await getConnectionInstance();
        let users = [];        
        const sql = 'BEGIN SP_CARGAR_USUARIOS(:cursor); END;'
        const cursor = {cursor: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}};
        const binds  = Object.assign({}, cursor);
        const options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT  
        };
       
        const result =  await connection.execute(sql, binds, options);
        const resultSet = result.outBinds.cursor;
        let row;
        while ((row = await resultSet.getRow())) {
          users.push(row);
        }        
        await resultSet.close();

        res.json(users);
    }
    catch(error){
        res.json(error)
        throw e;
    }
    
}

const registerUser = async (req, res) => {
    try {
        const {contrasenia, rut_user, correo_user, nombre, apellidoMaterno, apellidoPaterno, tipo_usuario, id_estado_usuario} = req.body;
        const connection = await getConnectionInstance();
        const sql = 'BEGIN SP_CREAR_USUARIO(:CONTRASENA,:RUT_USUARIO,:CORREO_USUARIO,:NOMBRE,:APELLIDO_MATERNO,:APELLIDO_PATERNO,:TIPO_USUARIO_ID,:ESTADO_USUARIO_ID_ESTADO); END;'
        const data = {CONTRASENA:contrasenia, RUT_USUARIO:rut_user, CORREO_USUARIO:correo_user ,NOMBRE:nombre, APELLIDO_MATERNO:apellidoMaterno, APELLIDO_PATERNO:apellidoPaterno, TIPO_USUARIO_ID:tipo_usuario, ESTADO_USUARIO_ID_ESTADO:id_estado_usuario};
        const binds  = Object.assign({}, data);
        const options = {
            autoCommit: true    
        };
        const result = await connection.execute(sql, binds,options);
        res.json({message: 'Success'})
        console.log(result) 
    }catch (error) {
        res.json(error)
        throw error;
    }
   
}


const filterUser = async (req, res) => {
    try {
        const {rut_user} = req.body;
        const connection = await getConnectionInstance();
        const sql = 'BEGIN SP_FILTAR_RUT(:RUT_USUARIO, :cursor); END;';
        const data = {RUT_USUARIO:rut_user, cursor: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}};
        const binds = Object.assign({}, data);
        const options = {
            autoCommit: true
        }
        const result = await connection.execute(sql, binds, options);
        const resultSet = result.outBinds.cursor;
        let row;
        while ((row = await resultSet.getRow())) {
            res.json(row);
        }        
        await resultSet.close();
        

    } catch (error) {
        res.json(error);
        throw error; 
    }
}


module.exports = {
    listUsers:listUsers,
    registerUser:registerUser,
    filterUser:filterUser
}