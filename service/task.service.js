const {connAttrs} = require("../utils/connection");
const { response } = require('express')
const oracledb = require('oracledb');

const getConnectionInstance = async()=>{
  return await oracledb.getConnection(connAttrs);
}

const createTask = async (req, res) => {
    try {
        const {descripcion, puntos_historia, funcion_id, dependencia, estado_tarea_id, origen_id} = req.body;

        const connection = await getConnectionInstance();
        const sql = 'BEGIN SP_CREAR_TAREA(:1, :2, :3, :4, :5, :6); END;';
        const data = {1:descripcion, 2:puntos_historia, 3:funcion_id, 4:dependencia, 5:estado_tarea_id, 6:origen_id};
        const binds = Object.assign({}, data);
        const options = {
            autoCommit: true
        };
        const result = await connection.execute(sql, binds, options);        
        res.json({message: 'Success'});

    } catch (error) {
        res.json(error);
        throw error;
    }
}

const updateTask = async (req, res) => {
    try {
        const { id_tarea, descripcion, puntos_historia, funcion_id, dependencia, estado_tarea_id, origen_id} = req.body;
        const connection = await getConnectionInstance();
        const sql = 'BEGIN SP_MODIFICAR_TAREA(:1, :2, :3, :4, :5, :6, :7); END;';
        const data = {1:id_tarea, 2:descripcion, 3:puntos_historia, 4:funcion_id, 5:dependencia, 6:estado_tarea_id, 7:origen_id};
        const binds = Object.assign({}, data);
        const options = {
            autoCommit: true
        }
        const result = await connection.execute(sql, binds, options);
        res.json({message: 'Success'});
        console.log(result);

    } catch (error) {
        res.json(error);
        throw error;
    }


}

const listTask = async (req, res) => {
    try {
        const connection = await getConnectionInstance();
        let tasks = []; 
        const sql = 'BEGIN SP_CARGAR_TAREAS(:cursor); END;';
        const data = {cursor:{dir: oracledb.BIND_OUT, type: oracledb.CURSOR} };
        const binds = Object.assign({}, data);
        const options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT  
        };
        const result =  await connection.execute(sql, binds, options);
        const resultSet = result.outBinds.cursor;
        let row;
        while ((row = await resultSet.getRow())) {
          tasks.push(row);
        }        
        await resultSet.close();

        res.json(tasks);
    } catch (error) {
        res.json(error);
        throw error;
    }
}
const deleteTask = async(req, res)=>{
    try{
        const connection = await getConnectionInstance();
        const {taskId} = req.body
        const options = {
            autoCommit: true
        }
        const sql =  
        `BEGIN
        :ret := FN_ELIMINAR_TAREA(:1);
        END;`;
        const result = await connection.execute(sql,{
            1: taskId,
            ret: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER}
        },options) 
        res.json(result.outBinds);
    }catch(e){
        throw e;
    }
}

const cancelTask = async (req, res) => {
    try {
        const {id_tarea, id_funcionario, justificacion} = req.body;

        const connection = await getConnectionInstance();
        const sql = 'BEGIN SP_CANCELAR_TAREA(:1, :2, :3); END;';
        const data = {1:id_tarea, 2:id_funcionario, 3:justificacion};
        const binds = Object.assign({}, data);
        const options = {
            autoCommit: true
        };
        const result = await connection.execute(sql, binds, options);        
        res.json({message: 'Success'});

    } catch (error) {
        res.json(error);
        throw error;
    }
}

const reportIncident = async (req, res) => {
    try {
        const { id_tarea, id_func, reporte } = req.body;

        const connection = await getConnectionInstance();
        const sql = 'BEGIN SP_REPORTAR_INCIDENTES(:1, :2, :3); END;';
        const data = {1:id_tarea, 2:id_func, 3:reporte};
        const binds = Object.assign({}, data);
        const options = {
            autoCommit: true
        };
        const result = await connection.execute(sql, binds, options);
        res.json({message: 'Successful Report'})

        
    } catch (error) {
        res.json(error);
        throw error;
    }
}

const reportAdvance = async (req, res) => {
    try {
        const { id_tarea, id_func, reporte } = req.body;

        const connection = await getConnectionInstance();
        const sql = 'BEGIN SP_REPORTAR_AVANCES(:1, :2, :3); END;';
        const data = {1:id_tarea, 2:id_func, 3:reporte};
        const binds = Object.assign({}, data);
        const options = {
            autoCommit: true
        };
        const result = await connection.execute(sql, binds, options);
        res.json({message: 'Successful Report'})

        
    } catch (error) {
        res.json(error);
        throw error;
    }
}

module.exports = {
    createTask: createTask,
    updateTask: updateTask,
    listTask: listTask,
    deleteTask: deleteTask,
    cancelTask: cancelTask,
    reportIncident: reportIncident,
    reportAdvance: reportAdvance
}