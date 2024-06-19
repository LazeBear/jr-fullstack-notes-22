const Joi = require('joi');

const addCourseSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().optional(),
  // 字母+数字
  // comp101 /
  // 1234    x
  // 101comp x
  code: Joi.string()
    .regex(/^[a-zA-Z]+[0-9]+$/)
    .message('Expecting something like COMP101')
    .uppercase()
    .required(),
});

module.exports = { addCourseSchema };
