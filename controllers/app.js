const helper = require('../util/helper');
const User = require('../models/user');
const Income = require('../models/income');
const Category = require('../models/category');
const Item = require('../models/item');

exports.getBadyetPage = (req, res) => { 
    res.render('app/badyet');
};

exports.getSettingsPage = (req, res) => {
    res.render('app/settings');
};