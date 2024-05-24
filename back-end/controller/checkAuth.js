const jwt = require('jsonwebtoken');
const User = require('../models/user')


const checkAuth = async (req, res) => {
    `this controller requires token from front-end page 
    and it will verify the token with the token provided 
    in the back-end page, if the token is the same it will change the status of the user to authenticated`
    
     const {token} = req.body;
        

     //console.log('token',token);
     try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            //console.log('success', JSON.stringify(decoded));
            const email = JSON.stringify(decoded.email);
           /// console.log('decoded_email', email);
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