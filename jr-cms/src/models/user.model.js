const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // role: {
  //   type: String,
  //   enum: ['admin', 'user']
  // }
});

// schema.methods.hashPassword = async function() {
//   this.password = await bcrypt.hash(this.password, 12);
// }
// user.hashPassword();

// const hashPassword = async (password) => bcrypt.hash(password, 12);
// user.password = hashPassword(user.password);

// schema.pre('save', ()=>{})
// schema.post

module.exports = model('User', schema);
