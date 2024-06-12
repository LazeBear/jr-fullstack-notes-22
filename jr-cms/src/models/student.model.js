const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
  // firstName: String,
  firstName: {
    type: String,
    // simple validation rules
    required: true,
    // minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = model('Student', studentSchema);
// students
