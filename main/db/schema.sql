DROP DATABASE IF EXISTS employee_manager;
CREATE DATABASE employee_manager;

use employee_manager;

create table department( 
id int not null  AUTO_INCREMENT PRIMARY KEY,
name varchar(30)
);

create table roles( 
id int not null AUTO_INCREMENT PRIMARY KEY,
title varchar(30),
salary decimal,
department_id int,
foreign key (department_id)
references department(id)
ON DELETE SET NULL
);

create table employee(
id int not null AUTO_INCREMENT PRIMARY KEY,
first_name varchar(30),
last_name varchar(30),
role_id int,
manager_id int,

CONSTRAINT fk_roles foreign key (role_id)
references roles(id)
ON DELETE SET NULL,
CONSTRAINT fk_manager foreign key (manager_id) 
references employee(id)
on delete set null
); 