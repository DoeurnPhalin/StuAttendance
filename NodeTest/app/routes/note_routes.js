var mysql = require('mysql');
var Timers = require('timers')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});


module.exports = function(app, db) {
  app.post('/QRpresent', (req, res) => {
    // You'll create your note here.
    var uname=req.body.Username;
    var pw=req.body.Password;
    
      con.query("use studentattendence");
      con.query("SELECT * FROM user where username=?",uname, function (err, result, fields) {
        if (err) throw err;
        
        
        if ( result[0].password === pw){
          console.log(result[0]);
          res.send((result));
        }
        else{
          res.write("Password Is Incorrect");
        }
        
    
      });
   
  });
  
  


  app.get('/login/:username/:password', (req,res) => {
    uname=req.params.username;
    pw=req.params.password;
      con.query("use studentattendence");
      con.query("SELECT course.* FROM studentcourse, course where courseID=id and studentid=?",uname, function (err, result, fields) {
        if (err) throw err;
       // console.log(result[0]);
        //re=result.find(r => r.StudentID === uname);
        res.send((result));
        res.end;
        
      });
    
  });


  app.get('/attendence/:username/:courseID', (req,res) => {
    uname=req.params.username;
    CID=req.params.courseID;
      con.query("use studentattendence");
      con.query("SELECT * FROM studentattendance where studentid=?",uname, function (err, result, fields) {
        if (err) throw err;
       // console.log(result[0]);
        //re=result.find(r => r.StudentID === uname);
        
        res.send((result));
        res.end;
      });
  });

};
  

