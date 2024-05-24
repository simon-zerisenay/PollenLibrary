
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bcrypt = require('bcrypt');

const register = async (req,res) =>{
  
    const {email, password, phone_number} = req.body;
    const role = 'user';
    try{
        console.log('register')
        const user_exist = await User.findByEmail(email);
        console.log('user_exist', user_exist);
        if(user_exist){
            return res.status(401).json({ status: 'error', error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create(email, hashedPassword, phone_number,role);

        const token = await jwt.sign({id:user.id, email:user.email } , process.env.jwt_secret)

        res.status(201).json({ message: 'User registered successfully', user: token  });
        } catch (err) {

         res.status(500).json({ message: err.message });
  
    }

}


const login = async (req, res) => {
   
    const {email, password} = req.body;
    try{
   const user_exist = await User.findByEmail(email);

   if(!user_exist){
    return res.status(401).json({ status: 'error', error: 'Invalid email'});
    }
    const isPasswordValid = await bcrypt.compare(password,user_exist.password_hash);

    if (!isPasswordValid) {
        return res.status(401).json({ status: 'error', error: 'Invalid password' });
    }

    const token = await jwt.sign({id:User.id, email:User.email } , process.env.jwt_secret)

    res.status(201).json({ message: 'User logged in successfully', user: token  });

    }catch(err){
    res.status(500).json({ message: err.message });
   }
};

module.exports = {
    register,
    login
}

