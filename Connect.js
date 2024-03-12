// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Use cors middleware
app.use(cors());
// Middleware to parse JSON body
app.use(bodyParser.json());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reactdb'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create table if not exists
connection.query(`
  CREATE TABLE IF NOT EXISTS student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adm VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL
    
  )
`);

// Define API endpoint to handle signup
app.post('/api/signup', (req, res) => {
  const { name, adm, email, password } = req.body;
  const query = 'INSERT INTO student (adm, password, name, email,phone) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [adm, password, name, email, phone_no], (error, results) => {
    if (error) {
      console.error('Error inserting data into MySQL database:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ success: true });
    console.log('Data inserted successfully')
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
