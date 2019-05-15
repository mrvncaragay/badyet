require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/index');
const errorPageRoute = require('./routes/errorPage');
const userRoute = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); //locate all html templates inside views folder

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(indexRoute);
app.use(userRoute);
app.use(errorPageRoute);

const port = process.env.PORT || 8080; //port 8080 for google app engine
app.listen(port);