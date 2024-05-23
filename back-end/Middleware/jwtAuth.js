
const jwt = require('jsonwebtoken');
const db = require('../Database/db');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        const [user] = await db.query("SELECT * FROM tbl_user WHERE user_id = ?", [decoded.id]);
      
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
      
        req.user = user; // Add user information to the request object
        
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = {authMiddleware};
