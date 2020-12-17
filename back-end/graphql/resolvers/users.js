const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError, ApolloError } = require('apollo-server');
const {
	validateRegisterInput,
	validateLoginInput,
} = require('../../src/utils/user.validators');

function generateJWT(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		'secret_key',
	);
}

module.exports = {
	Mutation: {
		register: async (
			_,
			{ registerInput: { username, password, confirmPassword, email } },
		) => {
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

			const token = generateJWT(res);

			return newUser;
		},
		login: async (_, { email, password }) => {
			const { errors, valid } = validateLoginInput(email, password);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const user = await User.findOne({ email });

			if (!user) {
				throw new UserInputError('User not found!', { errors });
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				throw new UserInputError('Wrong password', { errors });
			}

			try {
				const token = generateJWT(user);
			}
			catch(err){
				throw new ApolloError(err);
			}

			

			const returnObj = {
				...user._doc,
				id: user._id,
				token,
			};

			return returnObj;
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
