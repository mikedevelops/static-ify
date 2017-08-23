const winston = require('winston');
const path = require('path');
const StaticifyFactory = require('./lib/Factories/StaticifyFactory');
const ResourceManagerFactory = require('./lib/Factories/ResourceManagerFactory');

const tmp = path.join(__dirname, 'tmp', 'bundle');
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

const resourceManager = ResourceManagerFactory(library);
const staticify = StaticifyFactory({
    output: tmp,
    request: 'http://localhost:8765'
}, resourceManager);

global.logger = winston;
global.logger.level = 'debug';

staticify.start();
