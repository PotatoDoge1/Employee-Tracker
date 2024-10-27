// the below works if I wanted to export one function as an object at a time
// import { Client } from 'pg'; <- here I still need to export the Client class from pg
// // Function to view departments
// async function viewDepartments(client: Client): Promise<void> {
//     try {
//         const res = await client.query('SELECT * FROM department');
//         console.log(res.rows);
//     } catch (err) {
//         console.error('Error fetching departments in index.ts:', err);
//     }
// }
// export default viewDepartments;


import { Client } from 'pg';
// We need to import our specific client object from the file where we created our client object of class Client from the config/db.ts file 
import client from '../config/db.js'; // Here I am exporting the client object from the file

// I am creating a Queries class. This class has a parameter as a client with a type of Client class that was imported from 'pg'.
class Queries {

    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    // Function to view departments
    async viewDepartments(): Promise<void> {
        try {
            const res = await this.client.query('SELECT * FROM department');
            console.table(res.rows);
        } catch (err) {
            console.error('Error fetching departments in index.ts:', err);
        }
    }

    // Function to view roles
    async viewRoles(): Promise<void> {
        try {
            const res = await this.client.query('SELECT * FROM role');
            console.table(res.rows);
        } catch (err) {
            console.error('Error fetching departments in index.ts:', err);
        }
    }
}

// in the line below I am exporting an object which is an instance of the Queries class
export default new Queries(client);
// note in other exports like for functions or Classes the export syntax is 'export default ZZZZ'