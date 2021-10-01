const express = require("express");
const { Router } = require("express");
const app = express();
const bodyparser=require('body-parser');
const { request } = require("express");
const {listUsers} = require("../service/users");
const { login } = require("../service/login");

const router = Router();


app.use(bodyparser.json());

///Pour changer le format de la requete 
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use('/login', [], login)

app.use('/users', listUsers);



app.listen(8080, 'localhost', function(){
    console.log("El servidor funciona puerto 8080")
})

module.exports = router;