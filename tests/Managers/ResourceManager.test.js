require('jest');

const ResourceManager = require('../../lib/Managers/ResourceManager');

jest.mock('../../lib/Resources/Resource');

const Resource = require('../../lib/Resources/Resource');

describe('ResourceManager', () => {
    let service;
    let resource;
    let library;

    beforeEach(() => {
        library = {
            'foo': { resources: [], extensions: ['bar'] }
        };
        resource = new Resource('cache', 'extract');
        service = new ResourceManager(library);
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
