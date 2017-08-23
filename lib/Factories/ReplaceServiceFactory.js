const ReplaceService = require('../Services/ReplaceService');
const ParserServiceFactory = require('./ParserServiceFactory');
const RegExpServiceFactory = require('./RegExpServiceFactory');
const url = require('url');

/**
 * @returns {ReplaceService}
 * @constructor
 */
function ReplaceServiceFactory (manager, errorService) {
    return new ReplaceService(
        ParserServiceFactory(manager, errorService),
        RegExpServiceFactory(),
        url
    );
}

module.exports = ReplaceServiceFactory;
