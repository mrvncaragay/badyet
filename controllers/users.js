const User = require('../models/user')

exports.getSignUpPage = (req, res) => {
    res.render('users/sign_up');
};

exports.getSignInPage = (req, res) => {
    res.render('users/sign_in');
};

exports.createNewUser = (req, res) => {
    const {username, email, password} = req.body;
    const user = new User(username, email, password);
    user.add()
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log(err.message);
        });
};