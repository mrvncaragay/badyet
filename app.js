require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res) => {
    res.send('Index Page!');
});

const port = process.env.PORT || 8080;
app.listen(port);