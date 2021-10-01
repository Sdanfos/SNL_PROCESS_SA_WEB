const {connAttrs} = require("../utils/connection");
const { response } = require('express');
const oracledb = require('oracledb');
const {baseUserDTO} = require('../dto/users.dto');


const loggin = async (req, res) => {
    try{
            
        const { nombre_usuario, contrasena } = req.body;
    
        let connection = await oracledb.getConnection(connAttrs);
        const sql:string = 'BEGIN SP_INICIAR_SESION(:usuario, :contrasenia, :cursor); END;'
        const data:{usuario:string, contrasenia:string, cursor:any} = {usuario:nombre_usuario, contrasenia:contrasena, cursor: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}};
        const binds:any  = Object.assign({}, data);
        const options:any = {
            outFormat: oracledb.OUT_FORMAT_OBJECT  
        };
        const result:any =  await connection.execute(sql, binds, options);
        const resultSet:any = result.outBinds.cursor;
        let row:{usuario:string, tipo:number};
        while ((row = await resultSet.getRow())) {
            console.log(row);
        }        
        await resultSet.close();
            
        console.log(result)
        res.json(row)
            
    }
    catch(e){
        throw e;
    }
        
}

module.exports = {
    loggin
}