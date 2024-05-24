const {OAuth2Client} = require('google-auth-library');
const bcrypt = require('bcrypt')
const db = require('../Database/db')
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
dotenv.config()

const OAuthRegister = async (req, res) => {
   
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Referrer-Policy","no-referrer-when-downgrade");


  const redirectURL = `${process.env.back_end_url}/auth/oauthUserData`;

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
      redirectURL
    );

    // Generate the url that will be used for the consent dialog.
    try {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        //"https://www.googleapis.com/auth/user.phonenumbers.read",
        "openid",
      ],
      prompt: 'consent'
    });

    res.json({url:authorizeUrl})
  } catch (error) {
    console.error("Error generating Google OAuth URL:", error);
    res.status(500).json({ error: "Failed to generate Google OAuth URL" });
  }
};


// this function is called to get user information from the token provided by google.com
async function getUserData(access_token) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  const data = await response.json();
  const name = data.name;
  const email = data.email;
  return { name, email }; // Return user information
}

// this function is used to register user with Google authentication provider and submit to database
// Function to submit user data to the database
async function submitUserDataToDatabase(userData) {
  const { name, email } = userData;

  try {
    // Check if the email is already registered
    const [existingUser] = await db.query('SELECT * FROM users_table WHERE email = ?', [email]);
    
    if (existingUser) {
      console.log('User email already exists:', email);
      // You can handle existing user scenario here
    }

    // If the user does not exist, you can choose to generate a password here or get it from somewhere else
    const password = ""; 

    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);
    const role = 'user';
    // Insert user data into the database
    const user_result = await db.query(
      "INSERT INTO users_table (username, email, password_hash, role) VALUES (?,?,?,?)",
      [name, email, password_hash, role]
    );

    console.log('User registered successfully:', user_result);
    
  } catch (error) {
    console.error('Error:', error);
    // Handle database error
  }
}

/* GET home page. */
 const getOAuthInfo = async function(req, res) {

    const code = req.query.code;

    //console.log(code);
    try {
        const redirectURL = `${process.env.back_end_url}/auth/oauthUserData`;
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
          );
        const r =  await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await oAuth2Client.setCredentials(r.tokens);
        //console.info('Tokens acquired.');
        const user = oAuth2Client.credentials;
        
        // Get user data
        const userData = await getUserData(oAuth2Client.credentials.access_token);
        
        // Submit user data to the database
        
        await submitUserDataToDatabase(userData);
        const token = jwt.sign(
          { email: userData.email }, // Passing email as payload
          process.env.jwt_secret
        );
    
        // Send the token back to the frontend
       
        res.redirect(303, `${process.env.front_end_url}/Dashboard?token=${token}`);
       
      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }


   
  


};

module.exports = {
    OAuthRegister,
    getOAuthInfo
};
