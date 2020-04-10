var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const cookieParser = require("cookie-parser");
var path = require('path');
var urlManager = require('./routes');
//initialize the app
var app = module.exports = express();
app.use(cors());
var env = process.env.NODE_ENV;
app.set('env', env);
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
urlManager(app);


