const { ApolloServer } = require('apollo-server-express');

//for declaring graphql schema
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { MONGODB } = require('./config.js');
const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers/index');

const app = express();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({ req, res }) => ({ req , res })
});



app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);

server.applyMiddleware({ app, cors: false, path: '/graphql' })

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('MongoDB Connected')
  })
  .then(res => {
    app.listen({ port: 5000 }, () => {
      console.log('Server Connected!')
    })
})