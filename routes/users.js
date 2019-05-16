const express = require('express');
const route = express.Router();

const userController = require('../controllers/users');

route.get('/app/sign-in', userController.getSignInPage);

route.get('/app/sign-up', userController.getSignUpPage);

route.post('/app/sign-up', userController.createNewUser);

route.post('/app/sign-in', userController.signInPage);

module.exports = route;