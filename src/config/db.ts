import pg from 'pg';
const { Client } = pg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432
});

export default client;
