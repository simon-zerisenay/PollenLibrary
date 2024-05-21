const db = require('../Database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Login =  async(req, res) => {
    const {email, password} = req.body;
    try{
   const user_exist = await db.query(
    "SELECT * from tbl_user WHERE email = ?", [email]
   )
   if(!user_exist[0][0]) {
    return res.status(401).json({ status: 'error', error: 'Invalid email' });
   }
   const existingUser = user_exist[0][0];
   console.log(existingUser);
   const isPasswordValid = await bcrypt.compare(password, existingUser.password_hash);
        if (isPasswordValid) {
            const token = jwt.sign(
                { id: existingUser.id, name: existingUser.username, email: existingUser.email },
                process.env.jwt_secret
            );
            return res.json({ status: 'ok', user: token });
        } else {
            return res.status(401).json({ status: 'error', error: 'Invalid password' });
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ status: 'error', error: 'An error occurred during login' });
    }
}

module.exports = {Login};