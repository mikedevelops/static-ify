require('jest');

const FileService = require('../../lib/Services/FileService');
const path = require('path');

jest.mock('mkdirp');
jest.mock('rimraf');
jest.mock('../../lib/Managers/ResourceManager');
jest.mock('../../lib/Services/ErrorService');

const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const ResourceManager = require('../../lib/Managers/ResourceManager');
const ErrorService = require('../../lib/Services/ErrorService');

describe('FileService', () => {
    let service;
    let resourceManager;
    let errorService;

    beforeEach(() => {
        resourceManager = new ResourceManager();
        errorService = new ErrorService();
        service = new FileService(
            path,
            mkdirp,
            rimraf,
            resourceManager,
            errorService
        );
    });

    describe('createBundleDirectory()', () => {
        beforeEach(() => {
            resourceManager.getResourceTypes.mockReturnValue(['foo', 'bar']);
        });

        test('should create a directory for each resource', () => {
            service.createBundleDirectory('output');

            expect(mkdirp).toHaveBeenCalledTimes(2);
        });
    });

    describe('removeBundleDirectory()', () => {
        test('should invoke rimraf', () => {
            service.removeBundleDirectory('output');

            expect(rimraf).toHaveBeenCalled();
        });
    });
});
