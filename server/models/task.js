const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Group = require('./group');
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "not done"
  },
  due: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    default: "low"
  },
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  groupId: {
    type: ObjectId,
    ref: 'Group',
    default: null
  }
}, {timestamps: true})
  //add task to group if any
taskSchema.post('save', (doc, next)=> {
  if(doc.groupId !== null) {
    let taskId = doc._id;
    Group.findByIdAndUpdate(doc.groupId, {
      $addToSet:{
        tasks: taskId
      }
    })
    .then(group => {
      console.log('updated group');
      next();
    })
    .catch(error => {
      console.log(error)
      next(error);
    })
  } else next();
})

taskSchema.post('findOneAndDelete', (doc,next) => {
  if(doc.groupId) {
    let taskId = doc._id;
    Group.findByIdAndUpdate(doc.groupId
    , {
      $pull:{
        tasks: taskId
      }
    })
    .then(group => {
      console.log('deleted task from group')
      next(); 
    })
    .catch(error => {
      console.log(error)
      next(error);
    })
  }
})

const task = mongoose.model('task', taskSchema);
module.exports = task;