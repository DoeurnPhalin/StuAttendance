const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const http           = require('http');

const app            = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/http', (req,res) => {
    res.send('Hello World');
});

require('./app/routes')(app, {});

app.listen(port, () => {
console.log('We are live on ' + port);
});
