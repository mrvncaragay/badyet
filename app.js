require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); //parse submitted body
const sequelize = require('./database');
const session = require('express-session');
// const MySequelizeStore = require('express-mysql-session')(session); //store session in the database
const MySequelizeStore = require('connect-session-sequelize')(session.Store); //store session in the database
// const csrf = require('csurf'); //csrf attack protection

//Model
const User = require('./models/user');
const Income = require('./models/income');

const app = express();
const mysequelizestore = new MySequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 1 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
});
// const csrfProtection = csrf();

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views'); //locate all html templates inside views folder

//Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/app')
const statusPageRoutes = require('./routes/statusPage');
const userRoutes = require('./routes/users');

//Supported Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mysequelizestore, 
    cookie: {
        maxAge: 900000
    }
}));

//app.use(csrfProtection); //Run session when login/create is clicked.

//Create a local variables for all the views
app.use((req, res, next) => {
    //Store the csrf token to all views
    //res.locals.csrfToken = req.csrfToken();

    //Only store username after user logged in
    if(!req.session.isCurrentUserSignedIn) return next();

    User.findByPk(req.session.isCurrentUserId)
        .then(user => {
            req.currentUser = user;
            res.locals.user = user; //set ups local variables that are passed into the views (only exists in the views)
        })
        .catch(er => console.log(err));
    next();
});


app.use(indexRoutes); //Placed here before csrfProtection, so that it does not create csrfToken/Save it to db
app.use(authRoutes);
app.use(appRoutes);
app.use(userRoutes);
app.use(statusPageRoutes);

User.hasMany(Income, { constraint: true, onDelete: 'CASCADE' });

//Create DB
sequelize
    .sync()
    .then(result => {    
        const port = process.env.PORT || 8080; //port 8080 for google app engine
        app.listen(port);  
    })
    .catch(err => console.log(err));
