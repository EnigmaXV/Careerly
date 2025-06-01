const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const token = req.cookies.auth_token;
  console.log(token);
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "You are not authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: err.message });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "You do not have permission to perform this action" });
    }
    next();
  };
};

module.exports = { protect, restrictTo };
