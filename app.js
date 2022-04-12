const createError = require('http-errors');
const express = require('express');
const appDebugger = require('debug')('app:startup');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const errorMiddleware = require('./middleware/error');

const app = express();

winston.add(new winston.transports.File({ filename: 'logfile.log' }))

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
app.use(errorMiddleware);

app.listen(3001);

module.exports = app;
