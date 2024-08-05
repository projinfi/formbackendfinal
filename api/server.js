const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/api', (req, res) => {
  res.send('Server is up and running!');
});

app.post('/submit-form', (req, res) => {
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('User IP Address:', userIp);

  const { name, phone, city } = req.body;

  res.json({ userIp });
});

module.exports = (req, res) => {
  app(req, res);
};
