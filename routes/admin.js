var express = require('express');
var router = express.Router();
var auth = require('http-auth');
var mysql = require('mysql');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var con = mysql.createConnection({host: "199.19.224.212", user: "ryan", password: "password", database: "software"});
con.connect();


var basic = auth.basic({
        realm: "Private Area."
    }, (username, password, callback) => { 
        // Custom authentication
        // Use callback(error) if you want to throw async error.
        callback(username === "admin" && password === "admin");
    }
);
 
// Application setup.
router.use(auth.connect(basic));

//serve the admin.html page
router.get('/', function(req, res) {
  res.sendFile('pages/admin.html' , { root : '.'});
});
 
router.post('/upload', urlencodedParser, function (req, res){
  var x = req.body;
  var command = "INSERT INTO `dresses`(`base64`, `vector`, `description`) VALUES (\"" + x.base + "\", \"" + x.vector + "\", \"" + x.desc + "\")"
  con.query(command, function (err, result, fields) {
      if (err) throw err;
  });


  res.send("Dress added.");
 });

module.exports = router;
