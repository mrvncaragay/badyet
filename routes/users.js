const express = require('express');
const route = express.Router();

const userController = require('../controllers/users')

route.get('/app/sign-in', userController.getSignInPage)

route.get('/app/sign-up', userController.getSignUpPage)

module.exports = route;