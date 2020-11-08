const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  Mutation: {
    register : async (_ , 
      {
        registerInput: { username, password, confirmPassword, email }
      }
      ) => {
           
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email, 
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, 'secret_key');

      return newUser;
    }
  },
  
  Query: {
    users: async () => {
      try {
        const users = await User.find()
        return users;
      }
      
      catch(err){
        throw new Error(err);
      }
    }
  }
}