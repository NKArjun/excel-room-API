const winston = require('winston');
const { createLogger, transports } = require('winston');
require('winston-mongodb');

module.exports = function () {
    // winston.handleException(new winston.transports.File({ filename: 'uncaughtException.log' }));
    createLogger({
        transports: [
            new transports.Console({
                colorize: true,
                prettyPrint: true,
                handleExceptions: true
            }),
            new transports.File({
                filename: 'uncaughtException.log',
                handleExceptions: true
            })
        ]
    });

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(new winston.transports.File({ filename: 'logfile.log' }))
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/excel',
        options: {
            useUnifiedTopology: true
        },
        level: 'info'
    }));
}