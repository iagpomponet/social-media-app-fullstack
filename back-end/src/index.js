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
  cors: false,
  playground: true,
  context: (event) => {
    const { req, res } = event;
    const token = req.headers.cookie || '';

    return { req, res, token }
  }
});



app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);

app.use(function (req, res, next) {
  const token = req.headers.cookie.split(';').filter(cookie => cookie.indexOf(' smAuthCookie') != -1)[0].replace(' smAuthCookie=', '').trim();
  
  if(token){
    res.set('Bearer', token)
  }

  next();
});

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