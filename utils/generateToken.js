// backend/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  try {
    const token = jwt.sign(
      { user: { id: user._id, username: user.username } },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
};

module.exports = generateToken;
