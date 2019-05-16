const User = require('../models/user')
const bcrypt = require('bcryptjs');

exports.registerNewUser = (req, res) => {
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

exports.signInUser = (req, res) => {
     //user's submitted data
    const { email, password } = req.body;

    //Return to sign in if email OR password field is blank
    if(!email || !password) return res.redirect('/app/sign-in'); 
    
    //Returns 1 if email exist and 0 if it doesnt.
    User.isUserEmailExist(email)
        .then(([obj]) => {

            //Return to sign in if email doesnt exist
            if(!obj[0].any) return res.redirect('/app/sign-in'); 
            
            //Email exist find user
            return User.findByEmail(email)
                .then(([user]) => {

                    //check user password is correct
                    return bcrypt.compare(password, user[0].password)
                                .then(success => {
                                    success ? res.redirect('/app/badyet') : res.redirect('/app/sign-in');
                                })                                
                })
                .catch(err => console.log(err)) //failed to execute query
        })
        .catch(err => console.log(err)); //failed to execute query
};