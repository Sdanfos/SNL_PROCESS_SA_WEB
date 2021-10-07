const express = require("express");
const {listUsers, registerUser, filterUser} = require("../service/users");
const { login} = require("../service/login");

const router = express.Router();

router.post('/login', login);

router.post('/registerUser', registerUser);

router.get('/filterUser', filterUser);

router.get('/listUsers', listUsers);

module.exports= router;