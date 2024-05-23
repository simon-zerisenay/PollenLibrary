const express = require("express");
const router = express.Router();
const {OAuthRegister, getOAuthInfo} = require("../controller/oAuth")
const getUserInfomation = require("../controller/getUseInfo")
//const  {authMiddleware} = require("../MiddleWare/jwtAuth");
const checkAuth = require("../controller/checkAuth")
const { register, login } = require('../controller/EmailAuth');



//email authentication
router.post('/register', register);
router.post('/login', login);
router.post('/checkAuth', checkAuth);

//oauth
router.post("/oAuthRegister", OAuthRegister);
router.get("/oauthUserData", getOAuthInfo);















module.exports = router;