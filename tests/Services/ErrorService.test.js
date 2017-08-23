require('jest');

const ErrorService = require('../../lib/Services/ErrorService');

describe('ErrorService', () => {
    let service;

    beforeEach(() => {
        global.logger = {
            log: jest.fn()
        };
        service = new ErrorService();
    });

    describe('throwError()', () => {
        test('should throw error', () => {
            expect(() => {
                service.throwError('foo');
            }).toThrowError('foo');
        });
    });
});
