const express = require('express');
const route = express.Router();

const indexController = require('../controllers/index');

route.get('/', indexController.getIndexPage)

module.exports = route;