/* eslint-disable no-undef */
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());

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

app.get('/emails', (req, res) => {
    const sql = "SELECT * from Users;";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})



app.listen(8081, ()=>{
    console.log("listening");
} )