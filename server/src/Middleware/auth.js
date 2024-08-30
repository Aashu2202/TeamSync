const { verifyToken } = require('../Utils/jwtUtils');

const authenticateToken = async (req, res, next) => {
  console.log("Authenticating token...");
  const token = req.cookies.token; // Ensure this matches the cookie name set on the client-side
  console.log('Token from Cookie:', token); // Log token from cookie
  
  if (!token) return res.sendStatus(401);
  
  try {
    const user = await verifyToken(token);
    req.user = user;
    console.log('Decoded User:', req.user); // Log decoded user
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.sendStatus(403);
  }
};


// const authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!allowedRoles.includes(req.user.role)) {
//       return res.sendStatus(403);
//     }
//     next();
//   };
// };


// const authorizePlatform = (...allowedPlatforms) => {
//   return (req, res, next) => {
//     const platform = req.headers['x-platform'];
//     if (!allowedPlatforms.includes(platform)) {
//       return res.status(403).json({ message: 'Access denied for this platform' });
//     }
//     next();
//   };
// };

module.exports = { authenticateToken };
