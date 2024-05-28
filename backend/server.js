/* eslint-disable no-undef */
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

// Database connection example
const db = mysql.createConnection({
    host     : "tech-solutions-db.cjm8sy0uanhp.us-east-2.rds.amazonaws.com",
    user     : "christian_lulaj",
    password : "Alienware!586",
    database : "tech-solutions-db",
    port : 3306
  
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