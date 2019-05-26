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
                                   
                            //Create a category food and a single item            
                            user.createCategory({ title: 'Food', incomeId: income.id })
                                .then(category => {
                                    category.createItem({ label: 'Groceries', categoryId: category.id });
                                }) 
                                .catch(err => console.log(err));

                            //Create a category for Income
                            return user.createCategory({ title: 'Income', incomeId: income.id });                
                        })
                        .then(category => {
                            
                            //Create a item for Income 
                            return category.createItem({ label: 'Paycheck 1', categoryId: category.id });
                        })
                        .then(() => res.redirect('/app/sign-in') )
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err)); //failed to hash password      
        }) 
        .catch(err => console.log(err));

        

    // User.isUsernameAndEmailExist(username, email)
    //     .then(([ans]) => {
  
    //         //Redirect if email or username does exist
    //         if(ans[0].any) return res.redirect('/app/sign-up');
            
    //         //hash password and create user
    //         return bcrypt.hash(password, 12)
    //             .then(hashedPassword => {
    //                 const user = new User(username, email, hashedPassword);
                    
    //                 return user.save()
    //                     .then(() => {

    //                         user.init();
    //                         res.redirect('/app/sign-in');
    //                     })
    //                     .catch((err) => {
    //                         console.log(err);
    //                     });
    //             })
    //             .catch(err => console.log(err)); //failed to hash password
    //     })
    //     .catch(err => console.log(err)) //failed to execute query   
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
    // //Returns 1 if email exist and 0 if it doesnt.
    // User.isUserEmailExist(email)
    //     .then(([ans]) => {

    //         //Return to sign in if email doesnt exist
    //         if(!ans[0].any) return res.redirect('/app/sign-in'); 
            
    //         //Email exist find user
    //         return User.findByEmail(email)
    //             .then(([user]) => {
                    
    //                 //check user password is correct
    //                 return bcrypt.compare(password, user[0].password)
    //                             .then(doMatch => {
    //                                 if(doMatch) {
                               
    //                                     req.session.currentUser = user[0]; 
    //                                     req.session.isCurrentUserSignedIn = true;

    //                                     return req.session.save(() => {
    //                                         res.redirect('/app/badyet') 
    //                                     })
    //                                 } else {

    //                                 res.redirect('/app/sign-in');
    //                             }});                                
    //             })
    //             .catch(err => console.log(err)) //failed to execute query
    //     })
    //     .catch(err => console.log(err)); //failed to execute query
};

exports.signOutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};