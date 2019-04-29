/* jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const blogRouter = require('./router');
const {CONNECTION_URL, PORT} = require('./config');
const app = express();

mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/', jsonParser, blogRouter);
app.use(express.static(path.join(__dirname + '/public')));
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});

module.exports = {app};