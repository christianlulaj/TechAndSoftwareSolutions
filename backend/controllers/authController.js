const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/userModel');
const db = require('../config/db'); // Import the db instance

const authController = {
    login: (req, res) => {
        const { email, password } = req.body;
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        
        User.findByEmail(email, (err, data) => {
            if (err) return res.status(500).json(err);
            console.log(data);
            if (data.length > 0 && data[0].password === hashedPassword) {
                return res.json({ message: 'Login successful' });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        });
    },
 
    register: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
      
        try {
          User.findByEmail(email, async (err, results) => {
            if (err) return res.status(500).json({ error: 'Internal Server Error' });
            if (results.length > 0) return res.status(409).json({ error: 'Email already exists' }); // Use status 409
      
            const hashedPassword = await bcrypt.hash(password, 10);
            User.create(email, hashedPassword, (err, results) => {
              if (err) return res.status(500).json({ error: 'Internal Server Error' });
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
