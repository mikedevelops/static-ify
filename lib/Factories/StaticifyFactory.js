const Staticify = require('../Staticify');
const FileServiceFactory = require('./FileServiceFactory');
const ErrorServiceFactory = require('./ErrorServiceFactory');
const RequestServiceFactory = require('./RequestServiceFactory');
const ReplaceServiceFactory = require('./ReplaceServiceFactory');
const url = require('url');

/**
 * @param {Object} options
 * @param {ResourceManager} manager
 * @returns {Staticify}
 * @constructor
 */
function StaticifyFactory (options, manager) {
    const errorService = ErrorServiceFactory();

    return new Staticify(
        url,
        errorService,
        manager,
        FileServiceFactory(manager, errorService),
        RequestServiceFactory(errorService),
        ReplaceServiceFactory(manager, errorService),
        options
    );
}

module.exports = StaticifyFactory;
