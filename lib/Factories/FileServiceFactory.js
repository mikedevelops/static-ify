const FileService = require('../Services/FileService');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');

/**
 * @param {ResourceManager} resourceManager
 * @param {ErrorService} errorService
 * @returns {FileService}
 * @constructor
 */
function FileServiceFactory (resourceManager, errorService) {
    return new FileService(
        path,
        mkdirp,
        rimraf,
        resourceManager,
        errorService
    );
}

module.exports = FileServiceFactory;
