//import express
const express = require('express');
//import console.table to print in console
const consoleTable = require('console.table');
//import inquirer to show the prompt
const inquirer = require('inquirer');

// Import and require mysql2
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        password: '',
        database: 'employeetracker_db'
    },
    console.log(`Connected to the employeetracker_db database.`)
);


// Prompt message to select the action to execute.
const prompt = () => {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "prompt",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department"

        ]
    }

    ]).then(answer => {
        switch (answer.prompt) {
            case "View All Employees": viewAllEmployees();
                break;
            case "Add Employee": addEmployee();
                break;
            case "Update Employee Role": updateEmployeeRole();
                break;
            case "View All Roles": viewAllRoles();
                break;
            case "Add Role": addRole();
                break;
            case "View All Departments": viewAllDepartment();
                break;
            case "Add Department": addDepartment();
                break;
        }

    }).catch(error => console.error(error));
}

// To view all employees 
const viewAllEmployees = () => {
    db.query(`SELECT * from employee`, (error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.table(results);
        }
        prompt();
    });
}

//To Add Employee to the employee table
const addEmployee = () => {
    inquirer.prompt([{
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
    }, {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
    }
    ]).then(answer => {
        db.query(`INSERT INTO employee(first_name, last_name) VALUES(?,?)`, [answer.firstName, answer.lastName], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                db.query(`SELECT * from employee`, (error, results) => {
                    if (error) {
                        console.error(error);

                    } else {
                        console.table(results);

                    }
                    prompt();
                })
            }
        })
    }).catch(error => console.error(error));
}

// To update employee role on the exisiting employee, input employee id and role id.
const updateEmployeeRole = () => {
    inquirer.prompt([{
        type: "input",
        message: "What is the Employee ID you want to update ?",
        name: "employeeid",
        validate: (employeeId) => {
            if (employeeId) {
                return true;
            } else {
                console.log("Please enter valid employee Id , it cannot be empty or invalid");
                return false;
            }

        }
    }, {
        type: "input",
        message: "What is the role Id  you want to map to an Employee?",
        name: "roleid",
        validate: (roleId) => {
            if (roleId) {
                return true;
            } else {
                console.log("Please enter valid role Id , it cannot be empty or invalid");
                return false;
            }
        }
    }
    ]).then(answer => {
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [answer.roleid, answer.employeeid], (error, results) => {
            if (error) {
                console.error(error);
            } else {
                console.table(results);
            }
            prompt();
        });
    })
    

}
// To view all available roles from roles table.
const viewAllRoles = () => {
    db.query(`SELECT * from roles`, (error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.table(results);
        }
        prompt();
    });

}

//To add new role to the role table, input: role, salary
const addRole = () => {
    const deptList = () => db.promise().query(`SELECT * from department`).then((rows) => {
        const deptNames = rows[0].map(e => e.name);
        return deptNames;
    });
    inquirer.prompt([{
        type: "input",
        message: "What is the name of the role ?",
        name: "role"
    }, {
        type: "input",
        message: "What is the salary of the role ?",
        name: "salary"
    }
        , {
        type: "list",
        message: "Which department does the role belong to ?",
        name: "department",
        choices: deptList
    }

    ]).then(answer => {
        db.promise().query(`SELECT id from department where name = ?`, answer.department).then(ans => {
            let deptId = ans[0].map(e => e.id);
            return deptId[0];
        }).then((deptId) => {
            db.promise().query(`INSERT into roles(title, salary, department_id) VALUES( ?,?,?)`, [answer.role, answer.salary, deptId]);
            viewAllRoles();
            prompt();
        });
    })



}

//To view All Department from department table
const viewAllDepartment = () => {
    db.query(`SELECT * from department`, (error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.table(results);
        }
        prompt();
    });
}

// To add new department
const addDepartment = () => {
    inquirer.prompt([{
        type: "input",
        message: "What is the name of the department?",
        name: "department"
    }
    ]).then(answer => {
        db.query(`INSERT INTO department(name) VALUES(?)`, [answer.department], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                db.query(`SELECT * from department`, (error, results) => {
                    if (error) {
                        console.error(error);

                    } else {
                        console.table(results);

                    }
                    prompt();
                })
            }
        })
    }).catch(error => console.error(error));

}

//onload call prompt() function
prompt();