const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();
const router = express.Router();
const cors = require('cors');
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('./models/user');

// mongoose connection defined as IIFE( immediately invoked function expression)
//`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
(async function() {
  try {
    await mongoose.connect('mongodb+srv://amanbora:amanbora1@advait-nk66h.mongodb.net/test?authSource=admin&retryWrites=true&w=majority');
    console.log('Connected to mongodb successfully');
  } catch(error) {
    console.log('Error connecting to mongodb');
    console.log(error);
  }
})();

const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// middleware for handling token
const authenticate = expressJwt({
  secret: JWT_SECRET,
  requestProperty: 'auth',
  getToken: (req) => {
    if(req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.id);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

const getSingle = (req, res) => {
  const user = req.user.toObject();
  delete user['facebook'];
  delete user['__v'];
  res.json(user);
};

app.use('/user', require('./routes/user'));

router.route('/auth/me')
  .get(authenticate, getCurrentUser, getSingle);

app.use('/api', router);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
