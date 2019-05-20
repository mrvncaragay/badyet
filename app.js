require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); //parse submitted body
const db = require('./database');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session); //store session in the database
const csrf = require('csurf'); //csrf attack protection


const app = express();
const mysqlStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 120000

}, db);
const csrfProtection = csrf();

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
    store: mysqlStore, 
    cookie: {
        maxAge: 900000
    }
}));
app.use(csrfProtection); //Run session when login/create is clicked.

//Create a local variables for all the views
app.use((req, res, next) => {
    //Store the csrf token to all views
    res.locals.csrfToken = req.csrfToken();

    //Only store username after user logged in
    if(!req.session.currentUser) return next();
    
    res.locals.currentUserUsername = req.session.currentUser.username;
    res.locals.currentUserEmail = req.session.currentUser.email;
    next();
});

app.use(indexRoutes); //Placed here before csrfProtection, so that it does not create csrfToken/Save it to db
app.use(authRoutes);
app.use(appRoutes);
app.use(userRoutes);
app.use(statusPageRoutes);

const port = process.env.PORT || 8080; //port 8080 for google app engine
app.listen(port);