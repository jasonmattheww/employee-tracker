INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Purchasing"),
       ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 45000, 1),
       ("Salesperson", 90000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 95000, 2),
       ("Accountant", 70000, 3),
       ("Lawyer", 185000, 4),
       ("Procurement Agent", 75000, 5),
       ("Copywriting", 50000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Arnulfo", "Lucas", 1, NULL),
       ("Davis", "Keith", 2, 1),
       ("Brianna", "Mckinney", 3, NULL),
       ("Avery", "Love", 4, 3),
       ("Amber", "Huang", 5, 5),
       ("Jody", "Salazar", 6, NULL),
       ("Glenna", "Novak", 7, 7),
       ("Lela", "Fields", 8, NULL);