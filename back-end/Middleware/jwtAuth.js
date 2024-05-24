
const jwt = require('jsonwebtoken');
const db = require('../Database/db');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    console.log('token',token);
  
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        console.log('decoded',decoded);
        const [user] = await db.query("SELECT * FROM users_table WHERE email = ?", [decoded.email]);
      
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('user',user[0].user_id);
        req.user = user[0].user_id; // Add user information to the request object
       
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = {authMiddleware};
