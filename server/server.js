'use strict';

const nedb = require('nedb'),
      path = require('path'),
      bodyParser = require('body-parser'),
      express = require('express'),
      cors = require('cors');

const db = new nedb({
  filename: path.join(__dirname, 'logs.db'),
  autoload: true,
  timestampData: true
});

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/logs/', (req, res) => {
  db.find({}).sort({createdAt: 1}).exec((err, records) => {
    console.log('query all records');
    res.send(records);
  });
});

app.post('/logs/', (req, res) => {
  db.insert(req.body, (err, record) => {
    console.log('record stored');
    res.json(record);
  });
});

app.listen(5000, () => {
  console.log('listening on 5000');
});
