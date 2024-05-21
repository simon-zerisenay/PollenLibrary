const express = require("express");
const router = express.Router();
const RegisterUser = require("../controller/Register")
const {OAuthRegister, getOAuthInfo} = require("../controller/oAuth")
const {Login, Logout} = require("../controller/Login");
const getUserInfomation = require("../controller/getUseInfo")
//const  {authMiddleware} = require("../MiddleWare/jwtAuth");
const checkAuth = require("../controller/checkAuth")



//email authentication
router.post("/register", RegisterUser);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/getUserinfo",  getUserInfomation);
router.post('/checkAuth')


//authMiddleware,
//oauth
router.post("/oAuthRegister", OAuthRegister);
router.get("/oauthUserData", getOAuthInfo);













module.exports = router;