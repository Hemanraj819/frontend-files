create database mygovt;
use mygovt;

CREATE TABLE Government_Office (
    office_id INT PRIMARY KEY,
    office_name VARCHAR(50),
    department VARCHAR(30),
    officer_name VARCHAR(20),
    address VARCHAR(100),
    contact_number VARCHAR(20)
);