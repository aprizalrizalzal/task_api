require('dotenv').config();

const fs = require('fs');
const mysql = require('mysql');
const migration = require('mysql-migrations');

const migrationsPath = __dirname + '/migrations';

if (!fs.existsSync(migrationsPath)) {
  fs.mkdirSync(migrationsPath);
  console.log("Folder 'migrations' created.");
} else {
  console.log("Folder 'migrations' already exists.");
}

const initialConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const databaseName = process.env.DB_DATABASE;

initialConnection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`, function(err) {
  if (err) {
    console.error("Error creating database:", err.message);
    process.exit(1);
  } else {
    console.log(`Database '${databaseName}' checked/created successfully.`);
  }

  initialConnection.end((endErr) => {
    if (endErr) {
      console.error("Error closing initial connection:", endErr.message);
    }
  });

  const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: databaseName,
  });

  migration.init(pool, migrationsPath, function() {
    console.log("Finished running migrations");
  });

  module.exports = pool; 
});