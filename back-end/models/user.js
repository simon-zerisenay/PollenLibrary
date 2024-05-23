

const pool = require('../Database/db');

const User = {
  async create(email, password, phone_number) {
    const [result] = await pool.query('INSERT INTO users_table (email, password_hash, phone_num) VALUES (?, ?, ?)', [email, password, phone_number]);
    return {id:result.insertId, email:result.insertEmail};
  },
  
  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users_table WHERE email = ?', [email]);
    
    return rows[0];
    
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users_table WHERE id = ?', [id]);
    return rows[0][0];
  }

  
};

module.exports = User;
