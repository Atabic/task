"use strict";

var app       = require('./server/api'),
    config    = require('./server/config'),
    http      = require('http'),
    path = require('path'),
    express  =   require('express'),
    mongoose = require('mongoose');
    

global.__rootdir = __dirname;
global._ = require('lodash');

app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));

var httpServer = http.createServer(app);
mongoose.connect(config.db.baseUrl, { useCreateIndex: true, useNewUrlParser: true,useFindAndModify:false,useUnifiedTopology: true })
.then(d => {
    console.log('Database Active');
    httpServer.listen(config.server.port, function() {

        // comment log
        console.log(`web server is available at http://${config.server.host}:${config.server.port}`);

    });
}).catch(e => console.log('Error in DB'));


module.exports = app;
