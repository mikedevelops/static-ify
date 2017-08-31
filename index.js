const winston = require('winston');
const path = require('path');
const StaticifyFactory = require('./lib/Factories/StaticifyFactory');
const ResourceManagerFactory = require('./lib/Factories/ResourceManagerFactory');
const ErrorServiceFactory = require('./lib/Factories/ErrorServiceFactory');

const library = {
    'favicons': {
        resources: [],
        extensions: ['ico']
    },
    'css': {
        resources: [],
        extensions: ['css']
    },
    'javascript': {
        resources: [],
        extensions: ['js']
    },
    'images': {
        resources: [],
        extensions: ['jpg', 'jpeg', 'svg', 'png', 'webp']
    },
    'video': {
        resources: [],
        extensions: ['mov', 'avi', 'mp4']
    },
    'audio': {
        resources: [],
        extensions: ['mp3', 'wav']
    },
    'fonts': {
        resources: [],
        extensions: ['eot', 'woff', 'woff2', 'ttf']
    }
};

const errorService = ErrorServiceFactory();
const resourceManager = ResourceManagerFactory(library, errorService);
const tmp = path.join(__dirname, 'tmp', 'test');

const staticify = StaticifyFactory({
    output: tmp,
    request: 'http://localhost:8765',
    target: 'http://mike.com',
}, resourceManager, errorService);

global.logger = winston;
global.logger.level = 'info';

(async function () {
    await staticify.start();

    global.logger.log('info', '**************************************');
    global.logger.log('info', `Got ${resourceManager.getSuccessfulResources().length} resources successfully`);
    global.logger.log('info', `Replaced ${resourceManager.getReplaced().length} resource URLs`);
    global.logger.log('info', `Ignored ${resourceManager.getIgnored().length} resource URLs`);
    global.logger.log('info', `Failed to get ${resourceManager.getFailedResources().length} resources`);
    global.logger.log('info', `Logged ${errorService.getErrors().length} errors`);
})();
