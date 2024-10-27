//this is importing the pg (postgres) library
import pg from 'pg';
//we need to import the Client class from pg so that we can create new objects that are Client classes. This is done by destructuring the pg library.
const { Client } = pg;
import dotenv from 'dotenv';
dotenv.config();

//creating a new client object that is a type of class Client
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432
});

export default client;
