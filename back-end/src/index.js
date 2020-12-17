const { ApolloServer } = require('apollo-server-express');

//for declaring graphql schema
const express = require('express');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js')
const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers/index');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({ req }) => ({ req })
});


server.applyMiddleware({ app, path: '/teste' })

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('MongoDB Connected')
  })
  .then(res => {
    app.listen({ port: 5000 }, () => {
      console.log('gay')
    })
})