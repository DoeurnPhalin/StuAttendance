var mysql = require('mysql');
const add = require('./add');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  //database : "studentattendence"
});



module.exports = function(app, db) {
  con.query("use studentattendence2", function(){
    console.log("connected to db");
  });
  app.post('/QRpresent', (req, res) => {
    // You'll create your note here.
    var uname=req.body.id;
    var date=req.body.date;
    var cid=req.body.cid;
      con.query("SELECT * attendance where sid=? and date like ? and cid=?",[uname,date,cid], function (err, result, fields) {
        if (err) throw err;
        if(!result){
          console.log("You are not in this course");
        }
        else if (result){
          console.log(result[0]);
          con.query("update attendance set status='Present' where sid=? and date=? and cid=?",[result[0].sid,result[0].date,result[0].cid],function(err,result2,fields){
              if (err) res.send(err);
              else{
                res.send("Done");
              }
          });
          //add('e20150149',1,'04-08-18','01:00','F-404',"Present");
        }
        else{
          res.send("Username or Password Is Incorrect");
        }
        
    
      });
   
  });
  
  
  app.get('/', (req,res) => {
    
     
        res.json ("Hello now you are connected.");
    
  });

  app.post('/login/', (req,res) => {
    uname=req.body.username;
    pw=req.body.password;
      con.query("SELECT c.* FROM studentcourse as sc, course as c where sc.cid=c.cid and sid=?",uname,
       function (err, result, fields) {
        if (err) throw err;
       // console.log(result[0]);
        //re=result.find(r => r.StudentID === uname);
        res.json (result);
        
      
      });
    
  });


  app.post('/attendance/:username/:courseID', (req,res) => {
    uname=req.params.username;
    CID=parseInt(req.params.courseID,10);
    date=req.body.date;
    console.log(date);
    if(!date){
      con.query("SELECT * FROM attendance where sid=? and cid=?",[uname,CID],
       function (err, result, fields) {
        if (err) throw err;
       // console.log(result[0]);
        //re=result.find(r => r.StudentID === uname);
        
        res.send((result));
        
      });
    }
    else{
      con.query("select* from attendance where sid=? and cid=? and date like ?",[uname,CID,date],function(err,result,fields){
        if(err) res.send(err);
        else{
          res.json(result);
        }
      });
    }
  });
  
  app.post('/startclass', (req,res)=>{

    cid=parseInt(req.body.cid,10);
    
      con.query("select sid from studentcourse where cid=?",cid, function(err,result,fields){
        if (err) throw err;
        else {
        for(x in result){
          
          add(result[x].sid,cid,req.body.date,req.body.time,req.body.room,"Absent");
        }
        res.send("Done");
      }
      });
  });

  app.post('/user/:method', (req,res)=> {
    method =req.params.method;
    if(method==="add"){
      con.query("insert into user values (?,?,?)",[req.body.username,req.body.password,req.body.usertype],function(err,result,fields){
        if(err) res.send(err);
        else{
          res.send("Done");
        }
      })
    }
    else if(method==='update'){
      con.query("update user set password=?,usertype=? where username=?",[req.body.password,req.body.usertype,req.body.username],function(err,result,fields){
        if(err) res.send(err);
        else{
          res.send("Done");
        }
      });

    }
    else if(method ==='remove'){
      con.query("delete from user where username=?",req.body.username, function(err,result,fields){
          if (err) {
            res.send(err);
          }
          else{
            res.send("Done");
          }
      });
    }
    else {
      res.send("Please choose the specific option.");

    }
  });

  app.post('/course/:method', (req,res)=> {
    method =req.params.method;
    
    name=req.body.cname,
    tid=(req.body.tid),
    start=req.body.start,
    end=req.body.end,
    dec=req.body.dec,
    cid=parseInt(req.body.cid,10)
    data=[name,tid,start,end,dec,cid];
    if(method==="add"){

      con.query("insert into course (cname,teachBy,description,start,end) values (?,?,?,?,?)",[name,tid,dec,start,end], function(err,result,fields){
        if(err) res.send(err);
        else{
          res.send('Done');
        }
      });
    }
    else if(method==='update'){
      con.query("update course set cname=? , teachBy=? , start =?, end=?,description=? where cid=? ",data, function(err,result,fields){
        if (err) res.send(err);
        else{
          res.send("Done");
        }
      });

    }
    else if(method ==='remove'){
        con.query("delete from course where cid=?",cid,function(err,result,fields){
          if (err) res.send(err);
          else{
            res.send("Done");
          }
        })
    }
  });

  app.get('/student',(req,res)=>{
      con.query("select* from student", function(err,result,fields){
        if (err) res.send(errs);
        else{
          res.json(result);
        }
      });
  });

  app.get('/teacher/',(req,res)=>{
      con.query("select* from teacher ", function(err,result,fields){
          if(err) res.send(err);
          else{
            res.json(result);
          }
      });
  
  });

  app.get('/course',(req,res)=>{
      con.query("select* from course",function(err,result,fields){
        if(err) res.send(err);
        else{
          res.json(result);
        }
      });
  });

  
  app.post('/assignstudent/',(req,res)=>{
    con.query("insert into studentcourse values (?,?)",[parseInt(req.query.cid),req.query.sid],function(err,result,fields){
        if(err) res.send(err);
        else{
          res.send("Done");
        }
    });

  });

  app.post('/student/:method',(req,res) => {
  method =req.params.method;
  name=req.body.name,
  sid=(req.body.sid),
  dob=req.body.dob,
  year=req.body.year,
  department=req.body.department,
  data=[name,dob,year,department,sid];
  if(method==="add"){
    con.query("insert into student values (?,?,?,?,?)",[sid,name,dob,year,department], function(err,result,fields){
      if(err) res.send(err);
      else{
        res.send('Done');
      }
    });
  }
  else if(method==='update'){
    con.query("update student set sname=? ,dob =?, year=?,department=? where sid=? ",data, function(err,result,fields){
      if (err) res.send(err);
      else{
        res.send("Done");
      }
    });

  }
  else if(method ==='remove'){
      con.query("delete from student where sid=?",sid,function(err,result,fields){
        if (err) res.send(err);
        else{
          res.send("Done");
        }
      })
  }
  else {

  }
  });

  app.post('/teacher/:method',(req,res)=>{
  method=req.params.method;
  tid=req.body.tid;
  name=req.body.tname;
  skill=req.body.skill;

  if(method==='add'){
      con.query("insert into teacher values (?,?,?)",[tid,name,skill],function(err,result,fields){
        if(err) res.send(err);
        else{
          res.send("Done");
        }
      });
  }
  else if(method==='update'){
      con.query("update teacher set tname=?, skill=? where tid=?",[name,skill,tid],function(err,result,fields){
          if(err) res.send(err);
          else{
            res.send("Done");
          }
      });
  }
  else if(method==='remove'){
      con.query("delete from teacher where tid=?",tid,function(err,result,fields){
        if(err) res.send(err);
        else{
          res.send("Done");
        }
      })
  }

  });
}
