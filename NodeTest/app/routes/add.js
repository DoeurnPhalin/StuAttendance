var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
  });

module.exports= function(SID ,CID ,Date , Time , Room,status){
  con.query("use studentattendence2");
  var sql="insert into attendance (sid,cid,date,room,status) value (?,?,?,?,?)";
  var Val=[SID,CID,Date,Room,status];
  con.query(sql,Val,function (err, result,) {
    if (err) throw err;
    else{
      console.log("Done");
      
    }
  });

}