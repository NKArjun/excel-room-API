const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const authRouter = require('../routes/auth');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/api', authRouter);
}