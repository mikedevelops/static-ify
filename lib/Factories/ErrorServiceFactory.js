const ErrorService = require('../Services/ErrorService');
const ErrorFactory = require('./ErrorFactory');

/**
 * @returns {ErrorService}
 * @constructor
 */
function ErrorServiceFactory () {
    return new ErrorService(
        ErrorFactory
    );
}

module.exports = ErrorServiceFactory;
