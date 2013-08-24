var winston = require('winston');
var config = require('./package.json').config;

// winston setup
var log = module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: config.verbosity
        })
    ],
    levels: {
        debug: 2,
        info: 4,
        error: 10
    },
    colors: {
        debug: 'grey',
        info : 'cyan',
        error: 'red'
    }
});

log.info("Logging initiated!");
