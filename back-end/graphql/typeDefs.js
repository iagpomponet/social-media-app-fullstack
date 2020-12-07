const gql = require('graphql-tag');

module.exports = gql`
	type User {
		username: String
		_id: ID
		email: String!
		createdAt: String
		token: String
	}

	type Query {
		users: [User]
		user(id: Int): User
		getPosts: [Post!]!
	}

	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		createPost(body: String!): Post!
		login(email: String!, password: String!): User!
		likePost(username: String!, postId: String!): Post
	}

	type Post {
		id: ID!
		body: String!
		createdAt: String!
		email: String!
	}
`;
