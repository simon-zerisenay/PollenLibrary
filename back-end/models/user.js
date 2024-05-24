

const pool = require('../Database/db');

const User = {
  async create(email, password, phone_number,role) {
    const [result] = await pool.query('INSERT INTO users_table (email, password_hash, phone_num,role) VALUES (?, ?, ?)', [email, password, phone_number]);
    return {id:result.insertId, email:result.insertEmail};
  },
  
  async findByEmail(email) {
    try{
      const [rows] = await pool.query('SELECT * FROM users_table WHERE email = ?', [email]);
        return rows[0];
    }
    catch(err){
      console.log(err);
    }
    
    
  },

  async findById(user_id) {
    
    const [rows] = await pool.query('SELECT * FROM users_table WHERE user_id = ?', [user_id]);
    //console.log("it is running",rows);

    return rows[0];
  },

  async updateRole(user_id, role) {
    const [result] = await pool.query('UPDATE users_table SET role = ? WHERE user_id = ?', [role, user_id]);
    return result;
  }

 

  
};

module.exports = User;
