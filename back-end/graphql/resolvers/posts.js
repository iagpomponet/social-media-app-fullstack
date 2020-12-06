const Post = require('../../src/models/Post');
const { UserInputError } = require('apollo-server');
const { validateCreatePostInput } = require('../../src/utils/post.validators');
const jwt = require('jsonwebtoken');

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find();

				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutations: {
		async createPost(_, { postInput: { body, email, token } }) {
			const { errors, valid } = validateCreatePostInput(body, email, token);

			console.log('errors :>> ', errors);

			if (!valid) {
				throw new UserInputError('Post creation failed', { errors });
			}

			const verifyToken = jwt.verify(token, 'secret_key', (err, decoded) => {
				console.log('err :>> ', err);
				if (err) {
					throw new UserInputError('Token Inválido', { err });
				} else {
					return decoded;
				}
			});

			// console.log('decoded :>> ', decoded);

			console.log('verifyToken :>> ', verifyToken);

			if (!token) {
				throw new UserInputError('Post creation failed', { errors });
			}

			if (!verifyToken) {
				throw new UserInputError('Invalid Token', { errors });
			}

			const newPost = new Post({
				body,
				email,
				createAt: new Date().toISOString(),
			});

			await newPost.save();

			return {
				...newPost._doc,
				id: newPost._id,
				token,
			};
		},
	},
};
