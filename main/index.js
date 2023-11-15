function addADepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "addADepartment",
          message: "enter a department dood.",
        },
      ])
      .then((inquirerResponse) => {
        console.log("department added:  " + inquirerResponse.addADepartment);
        let departmentName = inquirerResponse.addADepartment;
        db.query(
          `INSERT INTO
                  department_list 
                  (dept_name) VALUES 
                  ('${departmentName}')`,
          function (err, results) {
            err
              ? console.log(err)
              : console.table(`Added ${departmentName}!!!!`, results),
              workTime();
          }
        );
      });
    }
    const addEmployee = () => {
      inquirer.prompt([
        {
          type: "input",
          name: "first_name", // Change this to first_name
          message: "Enter the employee's first name:",
        },
        {
          type: "input",
          name: "last_name", // Add this for last_name
          message: "Enter the employee's last name:",
        },
        // You can remove this question if you want to manually assign role_id and manager_id
        // {
        //   type: "input",
        //   name: "role_id",
        //   message: "Enter the role ID for the employee:",
        // },
        // {
        //   type: "input",
        //   name: "manager_id",
        //   message: "Enter the manager ID for the employee:",
        // },
      ])
      .then((inquirerResponse) => {
        console.log("Employee added: " + inquirerResponse.first_name + " " + inquirerResponse.last_name);
        
        // Assign role_id and manager_id here, or you can add additional prompts for them
    
        let employeeName = inquirerResponse.first_name;
        let employeeLastName = inquirerResponse.last_name;
        let roleId = 1; // Assign the appropriate role_id based on your logic
        let managerId = 1; // Assign the appropriate manager_id based on your logic
    
        pool.query(
          `INSERT INTO
          employee(first_name, last_name, role_id, manager_id) VALUES
          ('${employeeName}', '${employeeLastName}', ${roleId}, ${managerId})`,
          function (err, results){
            err
            ? console.log(err)
            : console.table(`Added ${employeeName} ${employeeLastName}!!!!`, results),
            startApp();
          }
        );
      });
    }

    //drop down option for manager/role id's

    const addEmployee = async () => {
      // Fetch roles and managers from the database
      const roles = await getRoles();
      const managers = await getManagers();
    
      inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter the employee's first name:",
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter the employee's last name:",
        },
        {
          type: "list",
          name: "role_id",
          message: "Select the role for the employee:",
          choices: roles.map(role => ({ name: role.title, value: role.id })),
        },
        {
          type: "list",
          name: "manager_id",
          message: "Select the manager for the employee:",
          choices: managers.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id })),
        },
      ])
      .then(async (inquirerResponse) => {
        console.log("Employee added: " + inquirerResponse.first_name + " " + inquirerResponse.last_name);
        
        let employeeName = inquirerResponse.first_name;
        let employeeLastName = inquirerResponse.last_name;
        let roleId = inquirerResponse.role_id;
        let managerId = inquirerResponse.manager_id;
    
        pool.query(
          `INSERT INTO
          employee(first_name, last_name, role_id, manager_id) VALUES
          ('${employeeName}', '${employeeLastName}', ${roleId}, ${managerId})`,
          function (err, results){
            err
            ? console.log(err)
            : console.table(`Added ${employeeName} ${employeeLastName}!!!!`, results),
            startApp();
          }
        );
      });
    }
    
    // Function to get roles from the database
    const getRoles = () => {
      return new Promise((resolve, reject) => {
        pool.query('SELECT id, title FROM roles', (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    }
    
    // Function to get managers from the database
    const getManagers = () => {
      return new Promise((resolve, reject) => {
        pool.query('SELECT id, first_name, last_name FROM employee', (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    }
    This code fetches the roles and managers 
    
    from the database before prompting the user, and 
    it dynamically populates the dropdown menus with 
    the retrieved data. The getRoles and getManagers functions 
    are asynchronous to handle the asynchronous nature of database
     queries.