const RequestService = require('../Services/RequestService');
const request = require('request-promise-native');

/**
 * @param {ErrorService} errorService
 * @returns {RequestService}
 * @constructor
 */
function RequestServiceFactory (errorService) {
    return new RequestService(
        request,
        errorService
    );
}

module.exports = RequestServiceFactory;
