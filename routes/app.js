const express = require('express');
const route = express.Router();
const isUserAuth = require('../middleware/is-auth');
const appController = require('../controllers/app');

route.get('/app/badyet', isUserAuth, appController.getBadyetPage);
route.get('/app/settings', isUserAuth, appController.getSettingsPage);
route.get('/app/item/:id', isUserAuth, appController.getItem);
route.get('/app/category/:id', isUserAuth, appController.getCategory);
route.put('/app/item', isUserAuth, appController.updateItem);
route.put('/app/category', isUserAuth, appController.updateCategory);
route.post('/app/category/new', isUserAuth, appController.postNewCategory);
route.post('/app/item/new', isUserAuth, appController.postNewItem);
route.post('/app/income/new', isUserAuth, appController.postNewIncome)
route.delete('/app/item/:id', isUserAuth, appController.deleteItem);
route.delete('/app/category/:id', isUserAuth, appController.deleteCategory);
route.get('/app/income/:month/:year', isUserAuth, appController.getIncome);
route.get('/app/income/', isUserAuth, appController.getIncomes);

module.exports = route;