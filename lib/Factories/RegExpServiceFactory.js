const RegExpService = require('../Services/RegExpService');

/**
 * @returns {RegExpService}
 * @constructor
 */
function RegExpServiceFactory () {
    return new RegExpService();
}

module.exports = RegExpServiceFactory;
