// Import packages
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  },
);

// Connects db and checks for errors
db.connect((err) => {
  if (err) throw err;
  initPropmt();
});


// To initialize prompt
function initPropmt() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role'],
      }
    ])
    .then((answers) => {
      switch (answers.menu) {
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
      }
    })
};

// View All Departments
function viewAllDepartments() {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    initPropmt();
  });
};

// View All Roles
function viewAllRoles() {
  const sql = `SELECT role.id, role.title, department.department_name AS department, role.salary
               FROM role
               LEFT JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    initPropmt();
  });
};

// View All Employees
function viewAllEmployees() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.department_name AS department, role.salary,
               CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager
               FROM employee 
               LEFT JOIN role ON employee.role_id = role.id
               LEFT JOIN department ON role.department_id = department.id
               LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
               
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    initPropmt();
  });
};