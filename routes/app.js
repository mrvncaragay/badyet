const express = require('express');
const route = express.Router();

const appController = require('../controllers/app');

route.get('/app/sign-in', appController.getSignInPage);
route.get('/app/sign-up', appController.getSignUpPage);
route.get('/app/badyet', appController.getBadyetPage);

module.exports = route;