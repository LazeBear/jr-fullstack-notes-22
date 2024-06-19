const { Schema, model } = require('mongoose');
const Joi = require('joi');

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
    validate: [
      {
        validator: (email) => {
          // regex 正则表达式
          // validation library
          // validator.js Joi Yup
          return Joi.string().email().validate(email).error === undefined;
          // valid -> return true
          // invalid -> return false
        },
        msg: 'Invalid email format',
      },
    ],
  },
  courses: [{ ref: 'Course', type: String }],
});

module.exports = model('Student', studentSchema);
// students
