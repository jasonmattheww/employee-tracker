DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INIT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) 
);

CREATE TABLE role (
  id INIT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INIT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id INIT NOT NOT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INIT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
  manager_id INIT NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);