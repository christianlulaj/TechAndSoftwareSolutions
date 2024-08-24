const db = require('../config/db');

const User = {
    findByEmail: (email, callback) => {
        const sql = 'SELECT email, password FROM users WHERE email = ?';
        db.query(sql, [email], callback);
    },
    
    create: (email, password, first_name, last_name, city, street_address, zipcode, phone_number, state, callback) => {
        const sql = 'INSERT INTO users (email, password, first_name, last_name, city, street_address, zipcode, phone_number, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [email, password, first_name, last_name, city, street_address, zipcode, phone_number, state], callback);
    }
};

module.exports = User;
