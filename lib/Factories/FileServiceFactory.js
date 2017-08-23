const FileService = require('../Services/FileService');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

/**
 * @param {ErrorService} errorService
 * @returns {FileService}
 * @constructor
 */
function FileServiceFactory (errorService) {
    return new FileService(
        path,
        mkdirp,
        rimraf,
        fs,
        errorService
    );
}

module.exports = FileServiceFactory;
