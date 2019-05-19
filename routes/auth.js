const express = require('express');
const route = express.Router();

const authController = require('../controllers/auth');

// GET
route.get('/app/sign-in', authController.getSignInPage);
route.get('/app/sign-up', authController.getSignUpPage);

// POST
route.post('/app/sign-up', authController.registerNewUser);
route.post('/app/sign-in', authController.signInUser);
route.post('/app/sign-out', authController.signOutUser);

module.exports = route;