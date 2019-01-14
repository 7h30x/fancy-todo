const Model = require('../models/task');
const mongoose = require('mongoose');
function cleanInput (input, allowedFields) {
  Object.keys(input).map(attr => (input[attr] !== '' && allowedFields.includes(attr)) ? null : delete input[attr]);
  return input
}

module.exports= class task {
  static create (req,res) {
    const allowedFields= ['name','due', 'priority', 'ownerId', 'groupId']
    let newTask = cleanInput (req.body, allowedFields);
    Model.create(newTask)
    .then(data => {
      console.log('created')
      res.status(200).json({
        message:'successfully created new task.',
        data
      })
    })
    .catch(error => {
      console.log('v')
      res.status(400).json({
        error
      })
    })
  }
  static read (req,res) {
    //find by user
    Model.find({
      userId: (req.body.userId)
    })
    .then(data => {
      if(data) {
        res.status(200).json({
          message:'successfully found.',
          data
        })
      } else {
        res.status(200).json({
          message:'no tasks found.',
        })
      }
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })
  }
  static update (req,res) {
    let taskId = req.body.taskId;
    const allowedFields= ['name','due','status', 'priority'];
    let payload = cleanInput(req.body, allowedFields);
    Model.findByIdAndUpdate(taskId,{$set:payload}, {new:true})
    .then(data => {
      if(data) {
        res.status(200).json({
          message:'successfully updated task.',
          data
        })
      } else {
        res.status(200).json({
          message:'no tasks found.',
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        error
      })
    })
  }
  static delete (req,res) {
    Model.findOneAndDelete({
      _id:req.body.taskId
    }).then(data => {
      if(data) {
        res.status(200).json({
          message:'successfully deleted task.',
          data
        })
      } else {
        res.status(200).json({
          message:'no tasks found.'
        })
      }
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })   
  }
}