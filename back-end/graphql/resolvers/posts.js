const Post = require('../../src/models/Post');

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
		async createPost(_, { postInput: { body, username } }) {
			const token = jwt.verify(token);

			const newPost = new Post({
				body,
				username,
			});

			await newPost.save();

			return newPost;
		},
	},
};
