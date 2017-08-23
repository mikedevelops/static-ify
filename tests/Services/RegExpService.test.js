require('jest');

const RegExpService = require('../../lib/Services/RegExpService');

describe('RegExpService', () => {
    let service;

    beforeEach(() => {
        service = new RegExpService();
    });

    describe('href()', () => {
        test('should match a href attribute', () => {
            const re = new RegExp(service.href());

            expect(JSON.stringify(re.exec('<a href="foo"></a>'))).toEqual(JSON.stringify(['href="foo"', 'foo']));
        });
    });

    describe('src()', () => {
        test('should match a src attribute', () => {
            const re = new RegExp(service.src());

            expect(JSON.stringify(re.exec('<img src="foo"/>'))).toEqual(JSON.stringify(['src="foo"', 'foo']));
        });
    });

    describe('url()', () => {
        test('should match a url string', () => {
            const re = new RegExp(service.url());

            expect(JSON.stringify(re.exec('url(foo)'))).toEqual(JSON.stringify(['url(foo)', 'foo']));
        });
    });

    describe('action()', () => {
        test('should match an action attribute', () => {
            const re = new RegExp(service.action());

            expect(JSON.stringify(re.exec('action="foo"'))).toEqual(JSON.stringify(['action="foo"', 'foo']));
        });
    });
});
