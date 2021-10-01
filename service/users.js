const {connAttrs} = require("../utils/connection");
const { response } = require('express')
const oracledb = require('oracledb');

const listUsers = async (req, res) => {
    try{
        let users = [];
        let connection = await oracledb.getConnection(connAttrs);
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
          console.log(row);
          users.push(row);
        }        
        await resultSet.close();
        
        console.log(result)
        res.json(users)
        
    }
    catch(e){
        throw e;
    }
    
}

const registerUser = async () => {

    const {contrasena, rut_usuario, correo_usuario, nombre_usuario, apellidoMaterno, apellidoPaterno, tipoUsuario, idEstadoUsuario} = req.body;

    let connection = await oracledb.getConnection(connAttrs);
    const sql = 'BEGIN SP_CREAR_USUARIO(:contrasenia, :rut, :nombre, :apellidoMater, :apellidoPater, :idTipoUser, :idEstadoUser); END;'
    const data = {contrasenia:contrasena, rut:rut_usuario, correo:correo_usuario ,nombre:nombre_usuario, apellidoMater:apellidoMaterno, apellidoPater:apellidoPaterno, idTipoUser:tipoUsuario, idEstadoUser:idEstadoUsuario};
    const binds  = Object.assign({}, data);
    const options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT  
    };
    const result =  await connection.execute(sql, binds, options);
    const resultSet = result.outBinds.cursor;
    let row;
    while ((row = await resultSet.getRow())) {
        console.log(row);
        res.json(row);
    }        
    await resultSet.close();
            
    console.log(result)



}

module.exports = {
    listUsers:listUsers
}