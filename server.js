// server static files.

// const fs = require('fs');
// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();

// CORS.
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use(compression());
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));
app.use(bodyParser.json({ limit: '1000mb' }));
app.use('/js', express.static(`${__dirname}/build/js`));
app.use('/css', express.static(`${__dirname}/build/css`));
app.use('/images', express.static(`${__dirname}/build/images`));
app.use('/fonts', express.static(`${__dirname}/build/fonts`));
app.set('env', process.env.NODE_ENV);

app.get('*', (req, res) => res.sendFile(`${__dirname}/build/index.html`))

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
