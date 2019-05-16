const express = require('express');
const route = express.Router();
const statusPage = require('../controllers/statusPage')

route.use(statusPage.get404Page);

module.exports = route;