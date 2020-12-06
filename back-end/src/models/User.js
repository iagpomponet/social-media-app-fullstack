const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
	id: String,
	email: String,
	password: String,
	createdAt: String,
	token: String,
});

module.exports = model('User', userSchema);
