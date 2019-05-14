const express = require('express');
const route = express.Router();
const errorPage = require('../controllers/errorPage')

route.use(errorPage.get404Page);

module.exports = route;