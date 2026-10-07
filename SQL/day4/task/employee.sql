
create database employee;
use employee;

create table empdata(

id int primary key auto_increment,
emp_name varchar(20),
department varchar(20),
salary varchar(20),
city varCHAR(20)


);

INSERT into empdata (emp_name,department,salary,city) values
("Raju","IT",30000,"villupuram"),
( 'gopi', 'IT', 45000, 'Chennai'),
( 'mani', 'HR', 35000, 'Madurai'),
( 'siva', 'IT', 55000, 'Chennai'),
( 'dhaya', 'Finance', 40000, 'Coimbatore'),
( 'chetta', 'HR', 38000, 'Chennai'),
( 'kumar', 'IT', 60000, 'Salem'),
( 'vicky', 'Finance', 42000, 'Madurai'),
('tk', 'IT', 50000, 'Chennai');

select department,count(*) from empdata group by department;
select department,sum(salary) from empdata group by department ;
select department,avg(salary) from empdata group by department ;
select city , count(*) from empdata group by city;


select department, count(*) from empdata group by department having count(*)>=2;
select department,sum(salary) as totsalary from empdata group by department having totsalary >=100000;
select department,avg (salary) as avgsalary from empdata group by department having avgsalary >=40000;

 select department ,count(*) as empcount ,avg(salary) as avgsalary from empdata group by department  having empcount>=2;
 select city ,sum(salary) as totalsalary , avg(salary) as avgsalary from empdata  group by city having totalsalary>=80000;
 select department,count(*)as empcount,sum(salary) as totalsalary ,avg(salary) as avgsalary,min(salary) as minimumsalary ,max(salary) as maximumsalary from empdata group by department having count(*)>=2 and avgsalary>=40000  order by avgsalary desc;