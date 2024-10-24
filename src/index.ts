import pg from 'pg';
const { Client } = pg;
import inquirer from 'inquirer';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432
});

async function executeApp() {
    try {
        await client.connect();
        await startInterface();
    } catch (err) {
        console.error('Database connection error:', err);
    } finally {
        await client.end();
        console.log('Disconnected from the database');
    }
}

async function startInterface(): Promise<void> {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'viewChoice',
            message: 'What would you like to do?',
            choices: ['View departments', 'View roles', 'View employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'Exit']
        },
    ]);

    if (answers.viewChoice === 'Exit') {
        return;  // Exit and allow disconnection
    } else if (answers.viewChoice === 'View departments') {
        await viewDepartments();
    } else if (answers.viewChoice === 'View roles') {
        await viewRoles();
    } else if (answers.viewChoice === 'View employees') {
        await viewEmployees();
    } else if (answers.viewChoice === 'Add department') {
        await addDepartment();
    } else if (answers.viewChoice === 'Add role') {
        await addRole();
    } else if (answers.viewChoice === 'Add employee') {
        await addEmployee();
    } else if (answers.viewChoice === 'Update employee role') {
        await updateEmployeeRole();
    }

    // Call the startInterface function again to continue prompting until Exit is selected
    await startInterface();
}

// Function to view departments
async function viewDepartments(): Promise<void> {
    try {
        const res = await client.query('SELECT * FROM department');
        console.log(res.rows);
    } catch (err) {
        console.error('Error fetching departments in index.ts:', err);
    }
}

// Function to view roles
async function viewRoles(): Promise<void> {
    try {
        const res = await client.query('SELECT * FROM role');
        console.log(res.rows);
    } catch (err) {
        console.error('Error fetching departments in index.ts:', err);
    }
}

// Function to view employees
async function viewEmployees(): Promise<void> {
    try {
        const res = await client.query('SELECT * FROM employee');
        console.log(res.rows);
    } catch (err) {
        console.error('Error fetching departments in index.ts:', err);
    }
}


// Function to add department to database
async function addDepartment(): Promise<void> {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department: ',
            validate: (input) => {
                if (!input || input.trim() === '') {
                    return 'Department name cannot be empty';
                }
                return true;
            }
        },
    ]);

    try {
        await client.query('INSERT INTO department (name) VALUES ($1)', [answer.departmentName]);
        console.log(answer.departmentName, 'added to the database');
        } catch (err) {
        console.error('Error adding department in index.ts:', err);
    }
}

// Function to add role to database
async function addRole(): Promise<void> {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'Enter the role title: ',
            validate: (input) => {
                if (!input || input.trim() === '') {
                    return 'Role title cannot be empty';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter the role Salary: ',
            validate: (input) => {
                const parsedInput = Number(input);
                if (isNaN(parsedInput) || parsedInput <= 0) {
                    return 'Role salary must be a number greater than 0:';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'roleDepartmentId',
            message: 'Enter the department ID for this role: ',
            validate: (input) => {
                if (!input || input.trim() === '') {
                    return 'The department ID cannot be empty:';
                }
                return true;
            }
        },
    ]);

    try {
        await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answer.roleTitle, answer.roleSalary, answer.roleDepartmentId]);
        console.log(answer.roleTitle, 'added to the database');
        } catch (err) {
        console.error('Error adding role in addRole() of index.ts:', err);
    }
}

// Function to add employee to database
async function addEmployee(): Promise<void> {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name: ',
            validate: (input) => {
                if (!input || input.trim() === '') {
                    return 'First name cannot be empty.';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee last name: ',
            validate: (input) => {
                if (!input || input.trim() === '') {
                    return 'Last name cannot be empty.';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID for the employee: ',
            validate: (input) => {
                if (!input || input.trim() === '') {
                    return 'Role ID cannot be empty.';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID for the employee: ',
            validate: (input) => {
                if (!input || input.trim() === '') {
                    return 'Manager ID cannot be empty.';
                }
                return true;
            }
        },
    ]);

    try {
        await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answer.firstName, answer.lastName, answer.roleId, answer.managerId]);
        console.log(answer.firstName, answer.lastName, 'added to the database');
        } catch (err) {
        console.error('Error adding employee in addEmployee() of index.ts:', err);
    }
}

// Function to update an employee's role
async function updateEmployeeRole(): Promise<void> {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the the ID of the employee whose role you would like to update: ',
            validate: (input) => {
                if (!input || input.trim() === '') {
                    return 'Employee ID cannot be empty.';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'roleId',
            message: "Enter employee's new role ID: ",
            validate: (input) => {
                if (!input || input.trim() === '') {
                    return "Employee's role ID cannot be empty.";
                }
                return true;
            }
        },
    ]);

    try {
        await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answer.roleId, answer.employeeId]);
        console.log('Employee ID:', answer.employeeId, "role has been updated to:", answer.roleId);
        } catch (err) {
        console.error('Error adding department in index.ts:', err);
    }
}

// Execute the connection and prompt flow
executeApp();