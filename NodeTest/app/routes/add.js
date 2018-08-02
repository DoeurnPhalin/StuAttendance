var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
  });

module.exports= function(SID ,CID ,Date , Time , Room){
  con.query("use studentattendence");
  var sql="insert into studentattendance (StudentID,CourseID,CourseDate,Room,StudentStatus) value (?,?,?,?,?)";
  var Val=[SID,CID,'18-08-05',Room,'Present'];
  con.query(sql,Val,function (err, result,) {
    if (err) throw err;
    else{
      console.log("Done");
      
    }
  });

}