import mysql from 'mysql2';
import dotEnv from 'dotenv';
dotEnv.config();
// create connection to mysql
const db = mysql.createConnection(
  {
    host: process.env.HOST_NAME,
    // MySQL username,
    user: process.env.USER_NAME,
    // MySQL password
    password: process.env.PASSWORD,

    database: process.env.DATABASE,
  },
  console.log(`Connected to the movie database.`)
);

export default db;
