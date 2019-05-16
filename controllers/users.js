const User = require('../models/user')
const bcrypt = require('bcryptjs');

exports.getSignUpPage = (req, res) => {
    res.render('users/sign_up');
};

exports.getSignInPage = (req, res) => {
    res.render('users/sign_in');
};

exports.createNewUser = (req, res) => {
    const { username, email, password } = req.body;

    //check empty req.body
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User(username, email, hashedPassword);
            return user.save();
        })
        .then(() => res.redirect('/app/sign-in')) 
        .catch(err => console.log(err));   
};

exports.signInPage = (req, res) => {
    const { email, password } = req.body;

    User.isUserEmailExist(email)
        .then( ([obj])  => console.log(obj[0].any))
        .catch(err => console.log('Doest not exist!'));
};