const express = require('express');
const router = express.Router();
const passport = require('passport');
var passportConfig = require('../config/passport');

//setup config for facebook login
passportConfig();

const userController = require('../controllers/user');

router.route('/auth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), userController.facebookOAuth, (req,res)=>{
    console.log("YESSSSSSSS");
  });

module.exports = router;
