const jwt = require('jsonwebtoken');
const config = require('../config'); // Create a config file for storing your secret key and other configurations
const User = require('../components/user/userModel'); // Adjust the path based on your project structure

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
    },
  };

  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }); // Adjust token expiration as needed
};

const authenticateUser = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Add user from payload
    req.user = await User.findById(decoded.user.id).select('-password'); // Exclude password from user object

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = { generateToken, authenticateUser };
