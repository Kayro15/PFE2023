const authMiddleware = require('./auth.middleware');
const jwt = require('jsonwebtoken');

const rolegetmidleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.PASSWORD_HASH_TOKEN);

    const role = decodedToken.role;
    //if (role !== 'admin' && role !== 'superadmin' && role !== 'recruiter') {
    if (role !== 'admin' && role !== 'superadmin' && role !== 'recruiter') {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = rolegetmidleware;
