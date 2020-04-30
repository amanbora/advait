const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  method: {
    type: String,
    enum: ['facebook'],
    required: true
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String
    },
    token: {
      type: String
    },
    select: false
  }
});

var User = mongoose.model('User', userSchema);

module.exports  = User;
