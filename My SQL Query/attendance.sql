CREATE TABLE if not exists `attendance` (
  `No` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `cid` int NOT NULL,
  `sid` varchar(10) NOT NULL,
  `date` timestamp,
  `room` varchar(10),
  `status` varchar(20),
  FOREIGN KEY fk_stu (sid)
REFERENCES student(id) on update cascade,
  FOREIGN KEY fk_course (cid)
REFERENCES course(cid) on update cascade
);
insert into attendance values (1,1,'e20150149','2018-08-10 13:00:00','F-209','Present');
insert into attendance (cid,sid,date,room,status) values (1,'e20150160','2018-08-10 13:00:00','F-209','Present');
select* from attendance;