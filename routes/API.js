var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//var con = mysql.createConnection({host: "199.19.224.212", user: "ryan", password: "password", database: "software"});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({message: 'respond with a resource'});
});


router.get('/dresses', function(req, res, next) {
  var con = mysql.createConnection({host: "199.19.224.212", user: "ryan", password: "password", database: "software"});
  con.connect();
  con.query("SELECT * FROM dresses", function (err, result, fields) {
      if (err) throw err;
      res.json(result)
  });
  con.end();
});

module.exports = router;
