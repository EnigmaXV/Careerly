const jwt = require("jsonwebtoken");

const generateCookie = (user, res) => {
  const payload = {
    userId: user._id,
    name: user.name,
    role: user.role,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

module.exports = generateCookie;
