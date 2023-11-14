const inquirer = require('inquirer');
const mysql = require('mysql2')
require('console.table')
// Create a connection pool (recommended for handling multiple connections)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Jondik@M92',
    database: 'employee_manager',
  });
  
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
  
    console.log('Connected to MySQL database!');
    
    // Release the connection after checking
    connection.release();
  });
//connects to the database

//Function to start the application
function startApp() {
    // Dynamic import of the inquirer package
    console.log("Hello, welcome to the employee tracker!");
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'openingmessage', // Change 'openingmessage' to 'action'
          message: 'What would you like to do?',
          choices: [
            'ViewAllEmployees',
            'ViewAllDepartments',
            'ViewAllRoles',
            'AddEmployee', // Corrected 'AddEmployee' instead of 'AddRmployee'
            'AddDepartment',
            'AddRole',
            'UpdateEmployeeRole',
            'Exit',
          ],
        },
      ])
      .then((answer) => {
        // Use 'answer.openingmessage' instead of 'answer.action'
        console.log(answer.openingmessage); // Check the received input
        
        switch (answer.openingmessage) {
          // Update cases to match the choices in your prompt
          // Make sure they match exactly (e.g., 'AddEmployee' instead of 'AddRmployee')
          case 'ViewAllEmployees':
            viewAllEmployees();
            break;
          case 'ViewAllDepartments':
            viewAllDepartments();
            break;
          case 'ViewAllRoles':
            viewAllRoles();
            break;
          case 'AddEmployee':
            addEmployee();
            break;
          case 'AddDepartment':
            addDepartment();
            break;
          case 'AddRole':
            addRole();
            break;
          case 'UpdateEmployeeRole':
            updateEmployeeRole();
            break;
          case 'Exit':
            console.log('Exiting the application...');
            // Optionally, close database connections or perform cleanup
            // Then exit the application
            process.exit(0);
            break;
          default:
            console.log('Invalid choice. Please select a valid option.');
            startApp(); // Restart the prompt if an invalid option is selected
            break;
        }
      });
  }
  
  // Calls function startApp();
  startApp();

  const viewAllEmployees = () => {
    // Query the database to get all employees
    pool.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp(); // Prompt the user for the next action
    });
  };

  const viewAllDepartments = () => {
    // Get all departments
    pool.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
  };
  const viewAllRoles = () => {
    //Get all roles 
    pool.query('SELECT * FROM roles', (err, res) => {
        if  (err) throw err;
        console.table(res);
        startApp();
    });
  };
//   const addEmployee = () => {
//     connection.query('INSERT INTO employee VALUES
//     (id, first_name, last_name, role_id, manager_id), (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         startApp();
//     });   
//   };
//   const addDepartment = () => {
//     connection.query('INSERT INTO department VALUES
//     (?, ?)', [] (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         startApp();
//     });   
//   };

//   const addRole = () => {
//     connection.query('INSERT INTO roles VALUES
//     (id, title, salary, department_id), (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         startApp();
//     });   
//   };
//   const updateEmployeeRole = () => {
//     connection.query('UPDATE role set = 
//     (id, 'name'), (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         startApp();
//     });   
//   };