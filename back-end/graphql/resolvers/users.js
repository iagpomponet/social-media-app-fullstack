const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput } = require('../../src/utils/validators');

module.exports = {
	Mutation: {
		register: async (
			_,
			{ registerInput: { username, password, confirmPassword, email } },
		) => {
			console.log('validateRegisterInput :>> ', validateRegisterInput);
			const { errors, valid } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword,
			);

			if (!valid) {
				console.log('validateRegisterInput :>> ', validateRegisterInput);
				console.log('errors :>> ', errors, valid);
				throw new UserInputError('Errors', { errors });
			}

			const user = await User.findOne({ email });

			if (user) {
				throw new UserInputError('E-mail address already taken', {
					errors: {
						email: 'E-mail already taken',
					},
				});
			}

			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save();

			const token = jwt.sign(
				{
					id: res.id,
					email: res.email,
					username: res.username,
				},
				'secret_key',
			);

			return newUser;
		},
	},

	Query: {
		users: async () => {
			try {
				const users = await User.find();
				return users;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
