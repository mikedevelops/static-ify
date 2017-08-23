const ResourceManager = require('../Managers/ResourceManager');

/**
 * ResourceManagerFactory
 * @param {Object} library
 * @returns {ResourceManager}
 * @constructor
 */
function ResourceManagerFactory (library) {
    return new ResourceManager(library);
}

module.exports = ResourceManagerFactory;
