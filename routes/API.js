var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })


var con = mysql.createConnection({host: "199.19.224.212", user: "ryan", password: "password", database: "software"});
con.connect();


router.get('/dresses', function(req, res, next) {
  con.query("SELECT * FROM dresses", function (err, result, fields) {
      if (err) throw err;
      res.json(result)
  });
  //con.end();
});

var auth = require('http-auth');
var basic = auth.basic({
        realm: "Simon Area."
    }, (username, password, callback) => { 
        // Custom authentication
        // Use callback(error) if you want to throw async error.
        callback(username === "admin" && password === "admin");
    }
);
 
// Application setup.
router.use(auth.connect(basic));
 
// Setup route.
router.get('/', (req, res) => {
    res.send(`Hello from express - ${req.user}! <a href="/api/admin/">Admin Console</a>`);
});


router.get('/admin', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/api/thank'  method='post' name='form1'>";
  html += "<p>Dress Description:<input type= 'text' name='description'></p>";
  html += "<p>Vector (Doesnt work yet):<input type='text' name='vector'></p>";
  html += "<p>Base_64:<input type='text' name='base'></p>";
  html += "<input type='submit' value='submit'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});
 
router.post('/thank', urlencodedParser, function (req, res){
  var command = "INSERT INTO `dresses`(`base64`, `description`) VALUES (\"" + req.body.base + "\" ,\"" + req.body.description + "\" )"
  var reply = ""
  con.query(command, function (err, result, fields) {
      if (err) throw err;
      //res.json(result)
      reply += "Dress added."
  });
  res.send(reply);
 });

module.exports = router;
