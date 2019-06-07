const User = require('../models/user');
const Income = require('../models/income');
const bcrypt = require('bcryptjs');

exports.getSignUpPage = (req, res) => {
    res.render('auth/sign_up');
};

exports.getSignInPage = (req, res) => {
    res.render('auth/sign_in');
};

exports.postNewUser = (req, res) => {
    const { username, email, password } = req.body;
    
    //Return to registration if username OR email OR password field is blank
    if(!username || !email || !password) return res.redirect('/app/sign-up');

    User.findOrBuild( { 
        where: { username: username,  
                 email: email },
        defaults: { password: password }         
        })
        .then(([user, created]) => {
            // return to sign-up if username or email exists
            if( !created ) return res.redirect('/app/sign-up');
        
            bcrypt.hash(password, 12)
                .then(hashedPassword => {

                    user.password = hashedPassword;
                    user.save()
                        .then((user) => {
                            return user.createIncome();       
                        })
                        .then(income => {
                             
                            return income.createCategory({ title: 'Income' });
                        })
                        .then(category => {

                            category.createItem({ label: 'PAYCHECK 1', categoryId: category.id });
                        })
                        .then(() => {
                            res.redirect('/app/sign-in');
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err)); //failed to hash password      
        }) 
        .catch(err => console.log(err));
};


exports.signInUser = (req, res) => {
     //user's submitted data
    const { email, password } = req.body;
   
    //Return to sign in if email OR password field is blank
    if(!email || !password) return res.redirect('/app/sign-in');
    
    User.findOne({
         where: { email: email }, 
         attributes: ['email', 'password', 'username', 'id']
        })
        .then(user => {
            if( !user ) return res.redirect('/app/sign-in');

            bcrypt.compare(password, user.password)
                .then(doMatch => {
                   
                  if(!doMatch) res.redirect('/app/sign-in');
                  
                  req.session.isCurrentUserId = user.id;
                  req.session.isCurrentUserSignedIn = true;
                  req.session.save(() => res.redirect('/app/badyet'));    
                })
                .catch(err => console.log(err));    
        })
        .catch(err => console.log(err));
};

exports.signOutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};