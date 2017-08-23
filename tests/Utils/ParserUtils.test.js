require('jest');

const ParserUtils = require('../../lib/Utils/ParserUtils');

jest.mock('../../lib/Managers/ResourceManager');
jest.mock('../../lib/Services/RegExpService');
jest.mock('../../lib/Services/ErrorService');

const ResourceManager = require('../../lib/Managers/ResourceManager');
const RegExpService = require('../../lib/Services/RegExpService');
const ErrorService = require('../../lib/Services/ErrorService');

describe('ParserUtils', () => {
    let service;
    let resourceManager;
    let regExpService;
    let errorService;

    beforeEach(() => {
        resourceManager = new ResourceManager();
        resourceManager.getLibrary.mockReturnValue({
            'foo': {
                extensions: ['bar']
            }
        });

        regExpService = new RegExpService();

        errorService = new ErrorService();
        service = new ParserUtils(
            resourceManager,
            regExpService,
            errorService
        );
    });

    describe('guessType()', () => {
        test('should guess extension and return type', () => {
            regExpService.extension.mockReturnValue(['href="bar"', 'bar']);

            expect(service.guessType('file.bar')).toEqual('foo');
        });

        test('should throw error if we cannot guess extension', () => {
            regExpService.extension.mockReturnValue(['href="baz"', 'baz']);
            service.guessType('file.baz');

            expect(errorService.throwError).toHaveBeenCalled();
        });
    });

    describe('isLocalAsset()', () => {
        test('should return true for resources with no host', () => {
            expect(service.isLocalAsset(null, 'localhost')).toBeTruthy();
        });

        test('should return true for matching host names', () => {
            expect(service.isLocalAsset('localhost', 'localhost')).toBeTruthy();
        });

        test('should return false for non matching host names', () => {
            expect(service.isLocalAsset('google', 'localhost')).toBeFalsy();
        });
    });
});
