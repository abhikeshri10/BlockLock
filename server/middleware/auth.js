const jwt = require('jsonwebtoken');

const config = require('../config/keys');

const verifyToken = (req, res, next) => {
  // console.log(req.body, req.headers);
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    // req.userType = decode
    req.user = decoded.user.id;
    // console.log(decoded);
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = verifyToken;
