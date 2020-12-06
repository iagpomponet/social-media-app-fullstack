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

	input PostInput {
		body: String!
		username: String!
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		createPost(postInput: PostInput): Post!
		login(email: String!, password: String!): User!
	}

	type Post {
		id: ID!
		body: String!
		createdAt: String!
		username: String!
	}
`;
