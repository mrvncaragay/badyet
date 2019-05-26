const express = require('express');
const route = express.Router();
const isUserAuth = require('../middleware/is-auth');

const appController = require('../controllers/app');

route.get('/app/badyet', isUserAuth, appController.getBadyetPage);
route.get('/app/settings', isUserAuth, appController.getSettingsPage);

route.post('/app/category', isUserAuth, appController.postNewCategory);
route.post('/app/item', isUserAuth, appController.postNewItem);

module.exports = route;