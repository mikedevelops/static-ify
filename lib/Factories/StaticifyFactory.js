const Staticify = require('../Staticify');
const FileServiceFactory = require('./FileServiceFactory');
const RequestServiceFactory = require('./RequestServiceFactory');
const ReplaceServiceFactory = require('./ReplaceServiceFactory');
const url = require('url');

/**
 * @param {Object} options
 * @param {ResourceManager} manager
 * @param {ErrorService} errorService
 * @returns {Staticify}
 * @constructor
 */
function StaticifyFactory (options, manager, errorService) {
    return new Staticify(
        url,
        errorService,
        manager,
        FileServiceFactory(errorService),
        RequestServiceFactory(errorService),
        ReplaceServiceFactory(manager, errorService),
        options
    );
}

module.exports = StaticifyFactory;
