var express = require('express');
var path = require('path');
var mysql = require('mysql');


  var connection = mysql.createConnection({ host: "199.19.224.212", user: "ryan", password: "password", database: "software"});
  connection.connect();
  var v;
  let sql = `SELECT base64, description FROM dresses`;
  connection.query(sql, (error, results, fields) => {
    if (error) { return console.error(error.message);}
    //console.log(results);
  });


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

