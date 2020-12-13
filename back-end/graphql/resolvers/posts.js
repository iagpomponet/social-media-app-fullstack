const Post = require('../../src/models/Post');
const { UserInputError } = require('apollo-server');

const checkAuth = require('../../src/utils/check-auth');

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
		async createPost(_, { body }, context) {
			const user = checkAuth(context);

			if(user){
				const newPost = new Post({
					body,
					user: user.id,
					username: user.username,
					createAt: new Date().toISOString(),
				});

				const post = await newPost.save();

				return post;
			}
		},

		async likePost(_, postId, username) {
			const post = Post.findById({ postId });

			if (!post) {
				throw new Error('Post not found');
			}

			return post;
		},
	},
};
