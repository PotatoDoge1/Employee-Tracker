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
    }

    // Call the startInterface function again to continue prompting
    await startInterface();  // Recursively call to continue prompting
}

async function viewDepartments(): Promise<void> {
    try {
        const res = await client.query('SELECT * FROM department');
        console.log(res.rows);
    } catch (err) {
        console.error('Error fetching departments in index.ts:', err);
    }
}

async function viewRoles(): Promise<void> {
    try {
        const res = await client.query('SELECT * FROM role');
        console.log(res.rows);
    } catch (err) {
        console.error('Error fetching departments in index.ts:', err);
    }
}

async function viewEmployees(): Promise<void> {
    try {
        const res = await client.query('SELECT * FROM employee');
        console.log(res.rows);
    } catch (err) {
        console.error('Error fetching departments in index.ts:', err);
    }
}

async function addDepartment(): Promise<string> {
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

    return answer.departmentName;
    //const query = `INSERT INTO department ('${answer.departmentName}') VALUES ($1)`;

}

// Execute the connection and prompt flow
executeApp();