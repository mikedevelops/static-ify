"use strict";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const Staticify = require('./src/Staticify.js');
const rimraf = require('rimraf');
const path = require('path');

const PORT = process.env.PORT || 8080;
const PUBLIC = path.resolve(__dirname + '/site/public');

// middleware
app.use(bodyParser.json());
app.use(cors());

// serve front end
app.use(express.static(PUBLIC));

/**
* Socket connection
**/

http.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});

app.get('/cli/test', (req, res) => {
    const eventEmitter = new events.EventEmitter();
    const bundle = new Staticify({
        requestUri: 'http://dev.sutton.pods.jadu.net/info/100001/advice_and_benefits/3/20_pages/2',
        assetPath: 'site',
        outputFile: 'index',
        targetUri: 'foo',
        verbose: true
    }, eventEmitter, io).initiate();

    res.send('fin');
});

io.on('connection', socket => {
    const eventEmitter = new events.EventEmitter();

    socket.emit('status', socket.id + ' Connected');

    socket.on('request:start', (data) => {
        const { requestUri, fileName, redirectUri, assetPath } = data;

        socket.emit('status', 'Setting up Staticify');

        const staticify = new Staticify({
            requestUri: requestUri,
            assetPath: assetPath,
            outputFile: fileName,
            targetUri: redirectUri,
            verbose: false
        }, eventEmitter, socket);

        socket.on('disconnect', () => {
            staticify.cleanOutput();

            socket.emit('status', 'Housekeeping');
        });

        socket.emit('status', 'Housekeeping');

        staticify.createDirs();

        socket.emit('status', 'Creating output directory');

        staticify.createDirs();

        socket.emit('status', 'Created output directory');

        staticify.registerEvents();

        socket.emit('status', 'Registered events');

        staticify.initiate();

        socket.emit('status', 'Building...');
    });
});
