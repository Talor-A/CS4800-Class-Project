var express = require('express');
var path = require('path');

var usersRouter = require('./routes/users');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

// app.use('/', indexRouter);

app.get('/', function(req, res) {
  res.sendFile('pages/index.html' , { root : __dirname});
});

module.exports = app;
