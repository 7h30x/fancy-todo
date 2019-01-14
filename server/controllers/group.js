const Model = require('../models/group');
const mongoose = require('mongoose');
module.exports= class group {
  static create (req,res) {
    let members = req.body.members;
    let owner = req.token._id;
    members.map(member => member=mongoose.Types.ObjectId(member));
    members.push(owner);
    let newGroup = {
      name: req.body.name,
      members
    }
    Model.create(newGroup)
    .then(data => {
      res.status(200).json({
        message:'successfully created new group.',
        data
      })
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })
  }
  static read (req,res) {
    let userId = req.token._id
    Model.find({
      members: userId
    })
    .populate('members')
    .populate('tasks')
    .then(data => {
      if(data) {
        res.status(200).json({
          message:'successfully found groups.',
          data
        })
      } else {
        res.status(200).json({
          message:'no groups found.',
        })
      }
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })
  }
 
  static delete (req,res) {
    Model.findOneAndDelete({
      _id:req.body.groupId
    }).then(data => {
      if(data) {
        res.status(200).json({
          message:'successfully deleted group.',
          data
        })
      } else {
        res.status(200).json({
          message:'no groups found.'
        })
      }
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })   
  }
  static updateMembers (req,res) {
    const newMembers = req.body.newMembers;
    Model.findByIdAndUpdate(req.body.groupId, {
      $addToSet: {members: newMembers}
    }, {new:true})
    .populate('members')
    .populate('tasks')
    .then(data => {
      res.status(200).json({
        message:'successfully updated group.',
        data
      })
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })
  }
}