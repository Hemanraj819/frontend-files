create database studentsdata;
use studentsdata;

create table student(
student_name varchar(20),
student_Age int(100),
student_dpt varchar(30),
city varchar(10)

);

insert into student (student_name,student_Age,student_dpt,city) values ("Ravi",22,"CSE","CHENNAI");

create table multistd(
student_name varchar(20),
student_Age int(100),
student_dpt varchar(30),
city varchar(10)
);

insert into multistd (student_name,student_Age,student_dpt,city) values ("Arun",23,"IT","MADURAI");
insert into multistd (student_name,student_Age,student_dpt,city) values ("Bala",21,"ECE","CHENNAI");
insert into multistd (student_name,student_Age,student_dpt,city) values ("Priya",24,"CSE","COIMBATORE");

create table  updatedata(
student_id int primary key auto_increment,
student_name varchar(20),
student_age int(100),
student_dpt varchar(20),
city varchar(30)

);

insert into updatedata (student_name,student_Age,student_dpt,city) values ("raju",20,"IT","MADURAI");

update updatedata set city ="BANGALORE" where student_id=1;


create table age(
id int primary key auto_increment,
std_name varchar(20),
age int(100)
);

insert into age (std_name,age)values("raju",20);
insert into age (std_name,age)values("mani",23);
insert into age (std_name,age)values("vicky",22);

update age set age=25 where id=3;

create table multicol(
id int primary key auto_increment,
std_name varchar(20),
age int(100),
dpt varchar(10),
city varchar(20)
);

insert into multicol (std_name,age,dpt,city)values("raju",20,"BCA","Gingee");

update multicol set age=24 where id=1;
update multicol set dpt="IT" where id=1;
update multicol set city="Chennai" where id=1;


create table updateusingdpt(
std_name varchar(20),
dpt varchar(20),
city varchar(10)
);

insert into updateusingdpt (std_name,dpt,city)values("raju","BCA","Chennai");
insert into updateusingdpt (std_name,dpt,city)values("mani","CSE","Chennai");
insert into updateusingdpt (std_name,dpt,city)values("dhaya","CSE","Chennai"); 

update updateusingdpt set city="Madurai" where dpt="CSE";

SET SQL_SAFE_UPDATES = 0;

update updateusingdpt set city="Madurai" where dpt="CSE";


CREATE TABLE delstd(
id int primary key auto_increment,
std_name varchar(20),
city varchar(20)
);

INSERT INTO delstd (std_name,city)values("gopi","chennai");
INSERT INTO delstd (std_name,city)values("raju","Gingee");
INSERT INTO delstd (std_name,city)values("chetta","Madurai");
INSERT INTO delstd (std_name,city)values("dhaya","Gingee");

DELETE FROM delstd where id=4;

CREATE TABLE dltusingcity(
id int primary key auto_increment,
std_name varchar(20),
city varchar(10)

);

INSERT INTO dltusingcity (std_name,city)values("dhaya","Gingee");
INSERT INTO dltusingcity (std_name,city)values("vicky","Salem");
INSERT INTO dltusingcity (std_name,city)values("kumar","Salem");


DELETE FROM dltusingcity where city="Salem";

CREATE TABLE usetimestamp(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100),
age INT,
city VARCHAR(100),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP                 ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO usetimestamp (name, age, city)VALUES('Arun', 22, 'Madurai'),('Ravi', 23, 'Chennai'),('Kumar', 21, 'Coimbatore');

UPDATE usetimestamp SET city = 'Bangalore' WHERE id = 2;

CREATE TABLE dmldata(
id INT PRIMARY KEY auto_increment,
std_name varchar(10),
age varchar(10),
dpt varchar(10),
city varchar(20)
);

insert into dmldata (std_name,age,dpt,city)values("raju",20,"Full STack","Chennai");

insert into dmldata (std_name,age,dpt,city)values("vicky",19,"Python","Bangalore");
insert into dmldata (std_name,age,dpt,city)values("mani",24,"Java","Villupuram");

update dmldata set city="Villupuram" where id=1;
update dmldata set age=25 ,dpt="BCA" where id=2;

delete from dmldata where id=3;