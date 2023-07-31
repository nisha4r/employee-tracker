//import express
const express = require('express');
const consoleTable = require('console.table');
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
            case "View All Departments": viewAllDepartment():
                break;
            case "Add Department": addDepartment();
                break;
        }

    }).catch(error => console.error(error));
}

const viewAllEmployees = () => {
    db.query(`SELECT * from employee`, (error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.table(results);
        }
    });
}

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
        db.query(`INSERT INTO employee(first_name, last_name) VALUES(?,?)`, [ans.firstName, ans.lastName], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                db.query(`SELECT * from employee`, (error, results) => {
                    if (error) {
                        console.error(error);

                    } else {
                        console.table(results);
                        prompt();
                    }
                })
            }
        })
    }).catch(error => console.error(error));
}

const updateEmployeeRole = () => {

    prompt();

}

const viewAllRoles = () => {
    db.query(`SELECT * from roles`, (error, results) =>{
        if (error) {
            console.error(error);
        } else {
            console.table(results);
        }
        prompt();
    });

}

const addRole = () => {

}

const viewAllDepartment = () => {

}

const addDepartment = () => {

}


prompt();