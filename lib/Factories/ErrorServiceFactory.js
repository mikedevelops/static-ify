const ErrorService = require('../Services/ErrorService');

/**
 * @returns {ErrorService}
 * @constructor
 */
function ErrorServiceFactory () {
    return new ErrorService();
}

module.exports = ErrorServiceFactory;
