var express = require('express');
var path = require('path');
var logger = require('morgan');

require ('./config/database')

var usersRouter = require('./app/routes/users');
var petsRouter = require('./app/routes/pets');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/pets', petsRouter);

module.exports = app;
