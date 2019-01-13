const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
var emailRegex = new RegExp("^.+@[^\.].*\.[a-z]{2,}$");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: val => (emailRegex.test(val))
    }
  },
  password: {
    type: String,
    required: true,
    maxlength: 30,
    validate: {
      validator: val => (mediumRegex.test(val))
    }
  },
  firstName: String,
  lastName: String,
  admin: {
    type: Boolean,
    default: false
  }
})

userSchema.pre('save', function (next) {
  let self = this;
  if(!this.isModified('password')) return next();
  bcrypt.genSalt(12, function(err, salt) {
    if (err) return next(err);
    // hash the password along with our new salt
    bcrypt.hash(self.password, salt, function(err, hash) {
        if (err) return next(err);
        self.password = hash;
        next();
    });
  });
})
userSchema.methods.createJWT = function(userData) {
  const payload = userData.toObject();
  delete payload.password;
  console.log(payload)
  return jwt.sign(payload, process.env.JWTSECRET);
}

userSchema.methods.comparePassword = function(candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
}
const User = mongoose.model('user', userSchema);
module.exports = User;