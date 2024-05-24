const db = require('../Database/db');
const jwt = require('jsonwebtoken');

const checkUserRole = async (req, res) => {
  const {email} = req.body;


  console.log('email',email)
  try {
    // Retrieve user role from the database using email
    const user = await db.query("SELECT role FROM users_table WHERE email = ?", [email]);
    
    console.log('user',user);
    // If user not found, return an error
    if (!user[0]) {
      console.log('sorry ')
      return res.status(401).json({ status: 'error', error: 'User not found' });
      
    }

    // Extract role from user data
    const {role }  = user[0][0];
    
    console.log("role: " + role)
    // Return role in the response body
    return res.status(200).json({ status: 'success', role });
    
  } catch (error) {
    // Return error message if an error occurs
    console.log(error);
    return res.status(500).json({ status: 'error', error: error.message });
  }
}

module.exports = checkUserRole;
