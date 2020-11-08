const gql = require('graphql-tag');

module.exports = gql`
type User {
  username: String!
  id: ID!
  email: String!
  createdAt: String
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

type Mutation{
  register(registerInput: RegisterInput): User
}

type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
}

`;