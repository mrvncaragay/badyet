const express = require('express');
const route = express.Router();

const userController = require('../controllers/users');

route.post('/app/sign-up', userController.registerNewUser);
route.post('/app/sign-in', userController.signInUser);

module.exports = route;