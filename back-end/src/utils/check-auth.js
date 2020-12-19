const jwt = require('jsonwebtoken');


//context is the info of request
module.exports = context => {
  // Pega a autorizacao pelo header da request
  const authHeader = context.req.headers.authorization;
  const { res } = context;


  const { AuthenticationError } = require('apollo-server');

  if(authHeader){
    // get token from request
    // bearer is the commom value for authorization token header
    const token = authHeader.split('Bearer ')[1];

    if(token){
      try {
        const user = jwt.verify(token, 'secret_key');
        return user;
      }
      catch(err){
        res.cookie("userLoggedIn", 'false', {
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });

        throw new AuthenticationError('Invalid - Expired Token');
      }
    }
    res.cookie("userLoggedIn", 'false', {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });
    throw new Error('Authentication token most be Bearer token');
  }
  res.cookie("userLoggedIn", 'false', {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  });
  throw new Error('Authentication header most be provided');
};
