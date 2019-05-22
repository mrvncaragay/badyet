
const User = require('../models/user');

exports.getBadyetPage = (req, res) => {
    res.render('app/badyet');
};

exports.getSettingsPage = (req, res) => {
    res.render('app/settings');
};