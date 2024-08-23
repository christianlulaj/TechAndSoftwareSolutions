const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/userModel');
const db = require('../config/db'); // Import the db instance

const authController = {
    login: (req, res) => {
        const { email, password } = req.body;        
        User.findByEmail(email, (err, data) => {
            if (err) return res.status(500).json(err);
         
            if (data.length > 0) {
              // Compare the plain-text password with the hashed password from the database
              bcrypt.compare(password, data[0].password, (err, isMatch) => {
                  if (err) return res.status(500).json(err);
  
                  if (isMatch) {
                      return res.json({ message: 'Login successful!' });
                  } else {
                      return res.status(401).json({ message: 'Invalid email or password' });
                  }
              });
          } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        });
    },
 
    register: async (req, res) => {
        const { firstName, lastName, street, city, state, zip, phone, email, password } = req.body;

        // Validate phone number format
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
          return res.status(422).json({ error: 'Invalid phone number format. Expected format: xxx-xxx-xxxx' });
        }

        if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
        
        try {
          User.findByEmail(email, async (err, results) => {
            if (err) return res.status(500).json({ error: 'Internal Server Error' });
            if (results.length > 0) return res.status(409).json({ error: 'Email already exists' }); // Use status 409
      
            const hashedPassword = await bcrypt.hash(password, 10);
            User.create( email, hashedPassword, firstName, lastName, city, street, zip, phone, state, (err, results) => {
              if (err){
                // INVALID PHONE NUMBER FORMAT
                if (err.errno == 3819) {
                    console.log(err);
                    return res.status(422).json({ error: 'Invalid phone number format' });
                }
            
                return res.status(500).json({ error: 'Internal Server Error' });
              } 
              return res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
            });
          });
        } catch (error) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      ,

    getLoginInfo: (req, res) => {
        const sql = 'SELECT * FROM users;';
        db.query(sql, (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }
};

module.exports = authController;
