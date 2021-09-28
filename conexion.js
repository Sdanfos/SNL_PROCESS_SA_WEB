const express = require("express");
const app = express();
const bodyparser=require('body-parser');
const oracledb = require('oracledb');
const { request } = require("express");


app.use(bodyparser.json());

///Pour changer le format de la requete 
app.use(bodyparser.urlencoded({
    extended: true
}));

const connAttrs = {
    "user": "SNL_PROCESS_SA",
    "password": "SNL_PROCESS_SA",
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=orcl)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
}

async function run(){
    try{
        let connection = await oracledb.getConnection(connAttrs);
        const sql = 'BEGIN SP_CARGAR_USUARIOS(:cursor); END;'
        const cursor = {cursor: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}};
        const binds  = Object.assign({}, cursor);
        const options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT  // uncomment if you want object output instead of array
        };
        const result =  await connection.execute(sql, binds, options);
        const resultSet = result.outBinds.cursor;
        let row;
        while ((row = await resultSet.getRow())) {
          console.log(row);
        }
        await resultSet.close();
        console.log(result)
    }
    catch(e){
        throw e;
    }
}
run();

app.listen(8080, 'localhost', function(){
    console.log("El servidor funciona puerto 8080")
})