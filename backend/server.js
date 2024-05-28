/* eslint-disable no-undef */
const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const cors = require('cors');
// const crypto = require('crypto');
require('dotenv').config();
const app = express();

// Allow requests from your frontend
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies
// Database connection example 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});
  
  
app.get('/', (req, res) => {
    return res.json("From Backend Side");
})

app.get('/login-info', (req, res) => {
    const sql = "SELECT * from Users;";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})


// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const sql = "SELECT * FROM Users WHERE email = ? AND password = ?";
  
    db.query(sql, [email, hashedPassword], (err, data) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json(err);
      }
      if (data.length > 0) {
        return res.json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  });

app.listen(8081, ()=>{
    console.log("listening");
} )