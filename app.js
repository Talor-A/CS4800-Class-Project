var express = require('express');
var path = require('path');

// Example of an API handler
var usersRouter = require('./routes/users');

var app = express();

// serve everything from the public/ folder as static assets (not changing)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

// app.use('/', indexRouter);

// serve the index.html page
app.get('/', function(req, res) {
  res.sendFile('pages/index.html' , { root : __dirname});
});

module.exports = app;
