const createError = require('http-errors');
const express = require('express');
const appDebugger = require('debug')('app:startup');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const mongoose = require('mongoose');
const config = require('config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

if (!config.get('jwtPrivateKey')) {
  appDebugger('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/excel')
  .then(() => appDebugger('Connected to MongoDB'))
  .catch(err => console.log(err))

appDebugger('Started Application')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});

app.listen(3001);

module.exports = app;
