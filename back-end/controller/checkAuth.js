const jwt = require('jsonwebtoken');

const checkAuth = async (req, res) => {
    `this controller requires token from front-end page 
    and it will verify the token with the token provided 
    in the back-end page, if the token is the same it will change the status of the user to authenticated`
    
     const {token} = req.body;

     try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            return res.status(200).json({ status:'success', data: decoded });
        }
        else {
            return res.status(401).json({ status: 'error', error: 'Invalid token' });
        }
     }catch(error){
        return res.status(500).json({status: 'error', error:"server error"})
     }
    

};

module.exports = checkAuth;