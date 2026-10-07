create database datafiles ;
use datafiles;


create table mycompany(
id int primary key auto_increment,
staff_name varchar(20),
age varchar(10),
salary varchar(20),
department varchar(20),
city varchar(20)
);

insert into mycompany (staff_name,age,salary,department,city) values 
("raju",20,40000,"IT","Chennai"),
("mani",23,50000,"Full Stack","Villupuram"),
("gopi",22,30000,"Full Stack","Chennai"),
("dhaya",26,60000,"HR","Salem"),
("mani",24,20000,"Python","Chennai"),
("chetta",21,50000,"Photography","Villupuram"),
("ravi",18,20000,"Java","Chennai");


SELECT staff_name,salary,city FROM mycompany;

SELECT *FROM mycompany  WHERE city="Chennai";

SELECT *FROM mycompany WHERE salary>45000;

SELECT * FROM mycompany WHERE age<28;

SELECT * FROM mycompany WHERE salary>=40000;

SELECT *FROM mycompany WHERE NOT department="HR";

SELECT * FROM mycompany WHERE department="IT" AND city="Chennai";

SELECT * FROM mycompany WHERE city="Chennai" OR city ="Madurai";

SELECT*FROM mycompany WHERE salary>40000 AND age<30;

SELECT *FROM mycompany WHERE city IN ("Madurai","Chennai","Salem");

SELECT * FROM mycompany WHERE  department  NOT IN ("IT","HR");

SELECT *  FROM mycompany WHERE city="";

SELECT * FROM mycompany WHERE NOT city="";

SELECT * FROM mycompany WHERE salary BETWEEN 35000 AND 50000;

SELECT *FROM mycompany WHERE staff_name like 'A%';

SELECT * FROM mycompany WHERE staff_name LIKE '%VI%';

SELECT distinct department FROM mycompany;

SELECT staff_name AS 'employee_name' from mycompany;

SELECT department AS 'department_name' from mycompany;

SELECT salary AS 'monthly_salary' from mycompany;