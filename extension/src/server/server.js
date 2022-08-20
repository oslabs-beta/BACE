const path = require('path');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../public/', 'popup.html'));
});

module.exports = app;