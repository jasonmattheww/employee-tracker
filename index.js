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

// Add Department
function addDepartment() {
  // Call prompt
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'What is the name of the department you want to add?',
        validate: department_name => {
          if (!department_name) {
            return 'Required to type a department name'
          } else {
            return true;
          }
        }
      }
    ])
    // Display results
    .then((answers) => {
      const sql = `INSERT INTO department (department_name)
                   VALUES (?)`;

      const params = [answers.department_name];

      db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log('Successfully added ' + answers.department_name + ' to the database');
        initPropmt();
      });
    });
};

// Add Role
function addRole() {
  // Fetch department names from the database
  const departmentSql = 'SELECT * FROM department';
  db.query(departmentSql, (err, departmentResult) => {
    if (err) throw err;

    const depChoice = departmentResult.map(department => ({
      name: department.department_name,
      value: department.id,
    }));

    // Call prompt
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the name of the role you want to add?',
          validate: title => {
            if (!title) {
              return 'Required to type a role'
            } else {
              return true;
            }
          }
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?',
          validate: salary => {
            if (!salary) {
              return 'Required to type a salary'
            } else {
              return true;
            }
          }
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Which department does the role belong to?',
          choices: depChoice,
        },
      ])
      // Display results
      .then((answers) => {
        const sql = `INSERT INTO role (role.title, role.salary, role.department_id)
                     VALUES (?, ?, ?)`;

        const params = [answers.title, answers.salary, answers.department_id];

        db.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log('Successfully added ' + answers.title + ' to the database');
          initPropmt();
        });
      });
  });
};

// Add Employee
function addEmployee() {
  // Fetch role and employee names from the database
  const roleSql = 'SELECT id, title FROM role';
  const managerSql = 'SELECT id, first_name, last_name FROM employee';

  db.query(roleSql, (err, roleResult) => {
    if (err) throw err;

    db.query(managerSql, (err, managerResult) => {
      if (err) throw err;

      const roleChoice = roleResult.map(role => ({
        name: role.title,
        value: role.id,
      }));

      const managerChoice = managerResult.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));

      // Call prompt
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'first_name',
            message: `What is the employee's' first name?`,
            validate: first_name => {
              if (!first_name) {
                return 'Required to type a first name'
              } else {
                return true;
              }
            }
          },
          {
            type: 'input',
            name: 'last_name',
            message: `What is the employee's' last name?`,
            validate: last_name => {
              if (!last_name) {
                return 'Required to type a last name'
              } else {
                return true;
              }
            }
          },
          {
            type: 'list',
            name: 'role_id',
            message: `What is the employee's' role?`,
            choices: roleChoice,
          },
          {
            type: 'list',
            name: 'manager_id',
            message: `Who is the employee's manager?`,
            choices: managerChoice,
          },
        ])
        // Display results
        .then((answers) => {
          const sql = `INSERT INTO employee (employee.first_name, employee.last_name, employee.role_id, employee.manager_id)
                   VALUES (?, ?, ?, ?)`;

          const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];

          db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log('Successfully added ' + answers.first_name + ' ' + answers.last_name + ' to the database');
            initPropmt();
          });
        });
    });
  });
};