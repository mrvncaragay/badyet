const express = require('express');
const route = express.Router();
const isUserAuth = require('../middleware/is-auth');

const appController = require('../controllers/app');

route.get('/app/badyet', isUserAuth, appController.getBadyetPage);
route.get('/app/settings', isUserAuth, appController.getSettingsPage);
route.get('/app/item/:itemId', isUserAuth, appController.getItem);

route.post('/app/category', isUserAuth, appController.postNewCategory);
route.post('/app/income-item', isUserAuth, appController.postNewIncomeItem);
route.post('/app/category-item', isUserAuth, appController.postNewCategoryItem)

module.exports = route;