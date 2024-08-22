const db = require('../config/db');

const User = {
    findByEmail: (email, callback) => {
        const sql = 'SELECT email FROM users WHERE email = ?';
        db.query(sql, [email], callback);
    },
    
    create: (email, hashedPassword, callback) => {
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(sql, [email, hashedPassword], callback);
    }
};

module.exports = User;
