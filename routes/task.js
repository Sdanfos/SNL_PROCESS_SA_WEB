const express = require("express");
const {createTask, updateTask, listTask, deleteTask, cancelTask, reportIncident, reportAdvance} = require("../service/task.service")

const router = express.Router();

router.post('/createTask', createTask);

router.put('/updateTask', updateTask);

router.get('/listTasks', listTask);

router.delete('/deleteTask', deleteTask);

router.post('/cancelTask', cancelTask);

router.post('/reportIncident', reportIncident);

router.post('/reportAdvance', reportAdvance);

module.exports= router;