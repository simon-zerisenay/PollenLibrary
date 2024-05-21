

const jwt = require('jsonwebtoken');
const db = require('../Database/db');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        const [user] = await db.query("SELECT * FROM tbl_user WHERE email = ?", [decoded.email]); // Assuming the column name is 'id'
      
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Check user role
        if (user.isadmin !== 'admin') {
            return res.status(403).json({ error: 'Forbidden', message: 'Insufficient privileges' });
        }
      
        req.user = user; // Add user information to the request object
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { authMiddleware };
