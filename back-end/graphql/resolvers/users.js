const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {
	validateRegisterInput,
	validateLoginInput,
} = require('../../src/utils/user.validators');

const { setLoggedHttpOnlyJWTCookie, setCookieAuth, clearAuthCookie, clearLoggedHttpOnlyJWTCookie } = require('../../src/utils/graphql-utils');

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
			{ registerInput: { username, password, confirmPassword, email, profilePic } }, {
				res
			},
		) => {
			const { errors, valid } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword,
			);

			if (!valid) {
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
				profilePic,
				createdAt: new Date().toISOString(),
			});

			const userResponse = await newUser.save();

			const token = generateJWT(userResponse);

			setLoggedHttpOnlyJWTCookie(token, res);
			setCookieAuth(res);

			return newUser;
		},

		login: async (_, { email, password }, { res }) => {
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

			const token = generateJWT(user);

			const returnObj = {
				...user._doc,
				id: user._id,
				token,
			};

			setLoggedHttpOnlyJWTCookie(token, res);
			setCookieAuth(res);

			return returnObj;
		},

		logout(_ , __ , { res }){
			clearLoggedHttpOnlyJWTCookie(res);
			clearAuthCookie(res);
		}
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

    user: async (_, { id }, context, teste) => {

      try {
        // const teste = ObjectId.fromString( id );
        const data = await User.findById(id);

        console.log('data :>> ', data);

        return data;
      } catch (error) {
        throw new Error(error);
      }
    }
	},
};
