var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10
/* GET users listing. */
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/', function(req, res, next) {
  const loginDetails = [
    req.body.username
  ]
  sql = "select user_level, user_id, pass from user where email = ?"
  con.query(sql, loginDetails, function (err, result) {
    if (err) throw err;
  
    console.log("Password: ",req.body.password)
    bcrypt.compare(req.body.password, result[0].pass, function(err, match) {
      if(match){
        console.log("Got a result!\n");
        var response
        if(result.length == 0){
          response = ["0","-1"]
        } else {
          response = [String(result[0]["user_level"]),String(result[0]["user_id"])]
        }
        console.log(response)
        res.send(response)
      } else {
        console.log("Passwords dont match!")
      }
  });
});




  // const loginDetails = [
  //   req.body.username,
  //   req.body.password,
  // ]
  // //sql query for the data
  // sql = "select user_level, user_id from user where email = ? and pass = ?"

  // con.query(sql, loginDetails, function (err, result) {
  //       if (err) throw err;
  //       console.log("Got a result!\n");
  //       var response
  //       if(result.length == 0){
  //         response = ["0","-1"]
  //       } else {
  //         response = [String(result[0]["user_level"]),String(result[0]["user_id"])]
  //       }
  //       console.log(response)
  //       res.send(response)
  //   });
  
});
router.post('/register', function(req, res, next) {
  var loginDetails = [
    req.body["First Name"],
    req.body["Last Name"],
    req.body.Email,
    req.body.Phone
    
    
  ]
  //sql query for the data
  sql = "INSERT INTO `user` (`user_id`, `fname`, `lname`, `email`, `phone`, `user_level`, `pass`) \
  VALUES (NULL, ?, ?, ?, ?, '1', ?)"
  console.log("Password: ", req.body.Password)
  bcrypt.hash(req.body.Password, saltRounds, function(err, hash) {
    loginDetails.push(hash)
    console.log("New hash: ",loginDetails)
    con.query(sql, loginDetails, function (err, result) {
      if (err) throw err;
      console.log("Created Customer!\n", result);
      res.sendStatus(200)
    });
  });
  
  
});

module.exports = router;
