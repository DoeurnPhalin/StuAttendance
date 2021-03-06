const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const sqdb           = require('./config/sqldb.js');


const app            = express();



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }) );
require('./app/routes')(app, {});
app.listen((process.env.PORT || '8000'), () => {
console.log('We are live on '+process.env.PORT);

});