const { createStubInstance } = require('../../lib/Utils/TestUtils');
const ResourceManagerFactory = require('../../lib/Managers/ResourceManager');
const Resource = require('../../lib/Resources/Resource');
const FileService = require('../../lib/Services/FileService');
const RequestService = require('../../lib/Services/RequestService');
const ErrorService = require('../../lib/Services/ErrorService');

describe('ResourceManager', () => {
    let resourceManager;
    let resource;
    let library;
    let outputDir;
    let fileService;
    let requestService;
    let errorService;

    beforeEach(() => {
        outputDir = '/path/to/output';
        fileService = createStubInstance(FileService, jest.fn());
        requestService = createStubInstance(RequestService, jest.fn());
        errorService = createStubInstance()
        library = {
            'foo': { resources: [], extensions: ['bar'] },
            'bar': { resources: [], extensions: ['js'], nested: true }
        };
        resourceManager = new ResourceManager(
            outputDir,
            library,
            // @todo - carry on with this
        );
    });

    describe('getLibrary()', () => {
        test('should return library', () => {
            expect(service.getLibrary()).toEqual(library);
        });
    });

    describe('getResourceTypes()', () => {
        test('should return an array of supported resource types', () => {
            expect(service.getResourceTypes()).toEqual(['foo']);
        });
    });

    describe('addResource()', () => {
        test('should add a new resource to the correct category', () => {
            service.addResource('foo', resource);

            expect(service.library['foo'].resources).toEqual([resource]);
        });
    });
});
