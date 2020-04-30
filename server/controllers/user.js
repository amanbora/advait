const JWT = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;

createToken = auth => {
  console.log(JWT_SECRET);
  return JWT.sign({
    id: auth.id
  }, JWT_SECRET,{ expiresIn: 60 * 120 });
}

module.exports = {
  facebookOAuth: async (req, res, next) => {

    if(!req.user) {
      return res.send(401, 'User not authenticated');
    }
    console.log(req.user);
    req.token = createToken(req.user);
    console.log(req.token);
    res.setHeader('x-auth-token', req.token);
    res.status(200).json(req.token);
  }
};
