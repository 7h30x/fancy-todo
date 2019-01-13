const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const groupSchema = new mongoose.Schema({
  name: String,
  members: {
    type:[{
      type:Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
  tasks: {
    type:[{
      type:Schema.Types.ObjectId,
      ref: 'task'
    }]
  }
})

const group = mongoose.model('group', groupSchema);
module.exports = group;