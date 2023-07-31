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

    }).catch(error => console.error(error));
}

const viewAllEmployees = () => {

}

const addEmployee = () => {

}

const updateEmployeeRole = () => {

}

const viewAllRoles = () => {

}

const addRole = () => {

}

const viewAllDepartment = () => {

}

const addDepartment = () => {

}


prompt();