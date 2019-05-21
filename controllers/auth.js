const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getSignUpPage = (req, res) => {
    res.render('auth/sign_up');
};

exports.getSignInPage = (req, res) => {

    res.render('auth/sign_in');
};


exports.registerNewUser = (req, res) => {
    const { username, email, password } = req.body;
   
    //Return to registration if username OR email OR password field is blank
    if(!username || !email || !password) return res.redirect('/app/sign-up');
    

    User.isUsernameAndEmailExist(username, email)
        .then(([ans]) => {
  
            //Redirect if email or username does exist
            if(ans[0].any) return res.redirect('/app/sign-up');
            
            //hash password and create user
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User(username, email, hashedPassword);
                    
                    return user.save()
                        .then(() => res.redirect('/app/badyet'))
                        .catch(() => res.redirect('/'));
                })
                .catch(err => console.log(err)); //failed to hash password
        })
        .catch(err => console.log(err)) //failed to execute query   
};

exports.signInUser = (req, res) => {
     //user's submitted data
    const { email, password } = req.body;
   
    //Return to sign in if email OR password field is blank
    if(!email || !password) return res.redirect('/app/sign-in'); 
    
    //Returns 1 if email exist and 0 if it doesnt.
    User.isUserEmailExist(email)
        .then(([ans]) => {

            //Return to sign in if email doesnt exist
            if(!ans[0].any) return res.redirect('/app/sign-in'); 
            
            //Email exist find user
            return User.findByEmail(email)
                .then(([user]) => {
                    
                    //check user password is correct
                    return bcrypt.compare(password, user[0].password)
                                .then(doMatch => {
                                    if(doMatch) {
                                        
                                        req.session.currentUser = user[0]; 
                                        req.session.isCurrentUserSignedIn = true;
                                        return req.session.save(() => {
                                            res.redirect('/app/badyet') 
                                        })
                                    } else {

                                    res.redirect('/app/sign-in');
                                }});                                
                })
                .catch(err => console.log(err)) //failed to execute query
        })
        .catch(err => console.log(err)); //failed to execute query
};

exports.signOutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};