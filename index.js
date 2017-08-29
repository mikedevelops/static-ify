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
global.logger.level = 'verbose';

(async function () {
    await staticify.start();
})();
