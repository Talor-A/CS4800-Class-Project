var mysql = require('mysql');

var con = mysql.createConnection({
  host: "199.19.224.212",
  user: "ryan",
  password: "password",
  database: "software"
});


con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM dresses", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
