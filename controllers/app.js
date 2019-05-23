const helper = require('../util/helper');
const User = require('../models/user');
const Income = require('../models/income');
const Category = require('../models/category');
const Item = require('../models/item');

exports.getBadyetPage = (req, res) => { 


    Income.getMonthIncome(helper.getCurrentMonth(), req.session.currentUser.id)
        .then(([income]) => { 
            res.render('app/badyet', { budget: income[0], month: helper.getMonth(helper.getCurrentMonth()) });
        })
        .catch(err => console.log(err));

};

exports.getSettingsPage = (req, res) => {
    res.render('app/settings');
};