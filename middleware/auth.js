const jwt = require('jsonwebtoken');

const dotenv = require('dotenv')
dotenv.config()
const secretKey = process.env.JWT_SECRET

// Middleware to authenticate token
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });
    console.log('token: ', token)
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        console.log('decoded: ', decoded)
        req.userId = decoded.user.id;
        next();
    });
};

module.exports  = authenticate