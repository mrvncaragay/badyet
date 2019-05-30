const express = require('express');
const route = express.Router();
const isUserAuth = require('../middleware/is-auth');

const appController = require('../controllers/app');

route.get('/app/badyet', isUserAuth, appController.getBadyetPage);
route.get('/app/settings', isUserAuth, appController.getSettingsPage);
route.get('/app/item/:id', isUserAuth, appController.getItem);
route.put('/app/item', isUserAuth, appController.updateItem);
route.post('/app/category/new', isUserAuth, appController.postNewCategory);
route.post('/app/item/new', isUserAuth, appController.postNewItem);

module.exports = route;