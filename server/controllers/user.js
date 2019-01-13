//CRUD USER (for admin)
const Model = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = class User {
  static signUp (req,res) {
      let newUser ={
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        admin: req.body.admin
      } 
      Model.findOne({email: newUser.email})
      .then(user => {
        if(user) {
          throw 'email is already registered.'
        } else {
          return Model.create(newUser)
        }
      })
      .then(response => {
        let token = response.createJWT(response);
        res.status(200).json({
          message:'successfully created new user',
          token
        })
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({
          message: error
        })
      })
  }
  static googleSignIn (req,res) {
    //after verifying gtoken check upsert user into DB

  }
  static signIn (req,res) {
    let userData;
    let loginData ={
      email: req.body.email,
      password: req.body.password
    } 
    console.log(loginData)

    Model.findOne({email: loginData.email})
    .then(user => {
      if(user) {
        userData = user.toObject();
        delete userData.password;
        return user.comparePassword(loginData.password);
      } else throw 'email not registered.';
    })
    .then(same => {
      if(same) {
        //create JWT
        let token = jwt.sign(userData, process.env.JWTSECRET);
        res.status(200).json({
          message: 'successfully signed in',
          token
        })
      } else throw 'wrong password.'
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        error
      })
    })
  }
  static gSignIn (req,res) {
    Model.findOneAndUpdate({
      email: req.body.payload.email
    }, {upsert: true})
    .then(user => {
      let payload= user.toObject();
      delete payload.password;
      let token = jwt.sign(payload, process.env.JWTSECRET);
      res.status(200).json({
        message: 'successfully signed in with google.',
        token
      })
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })
  }
}

 //to-do: user change password 