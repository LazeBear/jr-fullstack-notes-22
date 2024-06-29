// {
//   _id: String, / code
//   name: String,
//   description: String,
// }

const { Schema, model } = require('mongoose');
const schema = new Schema({
  _id: {
    type: String,
    alias: 'code', // 别名, virtual property
    // unique: true,
  },
  name: {
    type: String,
    required: true,
    // unique: true,
    // sparse: true,
  }, // null
  description: {
    type: String,
    default: 'This is a description example',
  },
  students: [
    {
      ref: 'Student',
      type: Schema.Types.ObjectId,
    },
  ],
  // student: {
  //   ref: 'Student',
  //   type: Schema.Types.ObjectId
  // }
});

module.exports = model('Course', schema);
