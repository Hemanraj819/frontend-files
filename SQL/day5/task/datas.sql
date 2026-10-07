create database courses;
use courses;

create table course (
course_id int primary key ,
course_name varchar(20),
trainer_name varchar(20)


);

insert into course (course_id,course_name,trainer_name)values

(101, 'Java', 'Ravi'),
(102, 'Python', 'Karthik');


create table studentdata(
std_id int primary key auto_increment,
std_name varchar (20),
course_id int,

foreign key (course_id) references course(course_id)
);


insert into studentdata (std_id,std_name,course_id) values
(1, 'Arun', 101),
(2, 'Bala', 101),
(3, 'Kumar', 102),
(4, 'Priya', 101),
(5, 'Divya', 102);


create table empdetails(
employee_id  int primary key auto_increment,
employee_name  varchar(20),
salary varchar(30),
department_id int 

);

create table employeedepartment (
department_id int,
department_name varchar(20)
);

insert into  empdetails (employee_name ,salary ,department_id)values
('Arun',45000,10),
('Bala',35000,20),
('Kumar',55000,10),
('Priya',40000,30);

insert into employeedepartment (department_id,department_name) values(10,'IT'),(20,'HR'),(30,'Finance'),(40,'Marketing');

SELECT e.employee_id,e.employee_name,e.salary,d.department_name
FROM empdetails as e
INNER JOIN employeedepartment as d
ON e.department_id = d.department_id;