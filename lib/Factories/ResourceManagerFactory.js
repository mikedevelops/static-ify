const ResourceManager = require('../Managers/ResourceManager');
const FileServiceFactory = require('./FileServiceFactory');
const RequestServiceFactory = require('./RequestServiceFactory');
const path = require('path');

/**
 * ResourceManagerFactory
 * @param {Object} library
 * @param {ErrorService} errorService
 * @returns {ResourceManager}
 * @constructor
 */
function ResourceManagerFactory (library, errorService) {
    return new ResourceManager(
        path,
        library,
        FileServiceFactory(errorService),
        RequestServiceFactory(errorService),
    );
}

module.exports = ResourceManagerFactory;
