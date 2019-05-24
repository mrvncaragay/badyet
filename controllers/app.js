const helper = require('../util/helper');
const User = require('../models/user');
const Income = require('../models/income');
const Category = require('../models/category');
const Item = require('../models/item');

exports.getBadyetPage = (req, res) => { 
    req.currentUser.getIncomes()
        .then(income => {
            res.render('app/badyet', { income: income[0] });
        })
        .catch(err => console.log(err));
};

exports.getSettingsPage = (req, res) => {
    res.render('app/settings');
};