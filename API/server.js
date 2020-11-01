const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db          = require('./config/db');
const fileupload  = require('express-fileupload');
const cors        = require('cors');
const morgan      = require('morgan');

const app         = express();

app.use(fileupload({
  createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


const port = 8000;
const client = new MongoClient(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(err => {
  if (err) return console.log(err)
  const db = client.db("Subjects")
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log("We are live on " + port);
  });
})
