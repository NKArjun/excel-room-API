const winston = require('winston');

module.exports = function (err, req, res, next) {
    winston.error(err.message);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json('Something failed');
}