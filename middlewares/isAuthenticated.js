//   Je vais chercher en BDD un user dont le token est dans ma variable token
const User = require("../models/User");
const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const user = await User.findOne({ token: token }).select("account");
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  req.user = user;
  next();
};

module.exports = isAuthenticated;
