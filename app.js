const createError = require('http-errors');
const express = require('express');
const appDebugger = require('debug')('app:startup');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const errorMiddleware = require('./middleware/error');
const winston = require('winston');
const app = express();

require('./startup/logging')();
require('./startup/db')();
require('./startup/config')();
require('./startup/routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => { winston.info(`Listening on port ${port}`) });

module.exports = app;
