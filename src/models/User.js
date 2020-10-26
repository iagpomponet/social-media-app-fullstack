const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: String,
  id: Number,
  email: String,
  createdAt: String 
});

module.exports = model("User", userSchema);