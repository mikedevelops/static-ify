const ParserUtils = require('../Utils/ParserUtils');
const path = require('path');

/**
 * ParserUtilsFactory
 * @param {ResourceManager} resourceManager
 * @param {RegExpService} regExpService
 * @param {ErrorService} errorService
 * @returns {ParserUtils}
 * @constructor
 */
function ParserUtilsFactory (resourceManager, regExpService, errorService) {
    return new ParserUtils(
        resourceManager,
        regExpService,
        errorService,
        path
    );
}

module.exports = ParserUtilsFactory;
