const express = require('express');
const route = express.Router();
const isUserAuth = require('../middleware/is-auth');

const appController = require('../controllers/app');

route.get('/app/badyet', isUserAuth, appController.getBadyetPage);
route.get('/app/settings', isUserAuth, appController.getSettingsPage);

module.exports = route;