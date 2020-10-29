const express         = require('express');
const MongoClient     = require('mongodb').MongoClient;
const bodyParser      = require('body-parser');
const db              = require('./config/db');
const nodemailer      = require('nodemailer');
const app             = express();

app.use(bodyParser.json());

const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

// Connect to Mongo Client
const client = new MongoClient(db.url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err) return console.log(err);
  require('./app/routes')(app, client, nodemailer);
  console.log('Connected to database');
}); 

// Listen to port
app.listen(port, () => {
  console.log("We are live on " + port);
});
