const {connAttrs} = require("../utils/connection");
const { response } = require('express');
const oracledb = require('oracledb');



const login = async (req, res) => {
    try{
            
        const { nombre_usuario, contrasena } = req.body;
    
        let connection = await oracledb.getConnection(connAttrs);
        const sql = 'BEGIN SP_INICIAR_SESION(:usuario, :contrasenia, :cursor); END;'
        const data = {usuario:nombre_usuario, contrasenia:contrasena, cursor: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}};
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
    catch(e){
        throw e;
    }
        
}

module.exports = {
    login
}