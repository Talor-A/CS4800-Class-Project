var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({host: "199.19.224.212", user: "ryan", password: "password", database: "software"});
con.connect();

router.get('/dresses', function(req, res, next) {
  con.query("SELECT * FROM dresses", function (err, result, fields) {
      if (err) throw err;
      res.json(result)
  });
  //con.end();
});


module.exports = router;