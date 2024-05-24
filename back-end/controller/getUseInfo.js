const db = require('../Database/db');
const jwt = require('jsonwebtoken');

const getUserInfomation = async (req, res) => {
  const email = req.body.email;
  
  try {
    // Retrieve user information using email
    const user = await db.query("SELECT * FROM users_table WHERE email = ?", [email]);

    if (!user[0][0]) {
      return res.status(401).json({ status: 'error', error: 'User not found' });
    }

    // Extract username and email from user data
    const { username, email: userEmail } = user[0][0];
    console.log("user: " + userEmail, username)
    // Return username, email, and token in the response body
    return res.status(200).json({ status: 'success', name:username, email: userEmail });
    
  } catch (error) {
    console.log("error: " )
    return res.status(500).json({ status: 'error', error: error.message });
  }
}


module.exports = getUserInfomation;
