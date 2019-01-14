const jwt = require('jsonwebtoken');

module.exports = function verifyJWT (req, res, next) {
  const token = req.headers.authorization;
  console.log(token)
  if(!token) {
    res.status(400).json({
      error: 'you are not authorized to access this endpoint.'
    })
  } else {
    jwt.verify(token, process.env.JWTSECRET, function (error, decoded) {
      if(error) {
        res.status(400).json({
          error
        })
      } else {
        req.token = decoded;
        console.log(req.token)
        next();
      }
    })
  }
}