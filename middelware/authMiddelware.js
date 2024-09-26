const jwt = require('jsonwebtoken');
require('dotenv').config()


// Authentication middleware
const requireAuth = (req, res, next) => {
   
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      // Verify the token
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
          console.log('Invalid token:', err.message);
          return res.status(401).json({ message: 'Unauthorized access' });
        } else {
          req.user = decodedToken;
          next(); 
        }
      });
    } else {
      console.log('No token found, blocking access.');
      return res.status(401).json({ message: 'No token, authorization denied' });


    }
  };


  

module.exports = { requireAuth };
