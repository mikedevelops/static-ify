const ParserService = require('../Services/ParserService');
const ResourceFactory = require('../Factories/ResourceFactory');
const ParserUtilsFactory = require('./ParserUtilsFactory');
const RegExpServiceFactory = require('./RegExpServiceFactory');
const url = require('url');

/**
 * @param {ResourceManager} manager
 * @param {ErrorService} errorService
 * @returns {ParserService}
 * @constructor
 */
function ParserServiceFactory (manager, errorService) {
    const regExpService = RegExpServiceFactory();
    return new ParserService(
        manager,
        ResourceFactory,
        ParserUtilsFactory(manager, regExpService, errorService),
        regExpService,
        url
    );
}

module.exports = ParserServiceFactory;
