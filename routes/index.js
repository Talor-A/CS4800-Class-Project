var express = require('express');
var router = express.Router();
var mysql = require('mysql');


  var connection = mysql.createConnection({ host: "199.19.224.212", user: "ryan", password: "password", database: "software"});
  connection.connect();
  var v;
  let sql = `SELECT base64, description FROM dresses`;
  connection.query(sql, (error, results, fields) => {
    if (error) { return console.error(error.message);}
    console.log(results);
  });


var app = express();


app.set('view engine', 'jade');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express'});
});

module.exports = router;
