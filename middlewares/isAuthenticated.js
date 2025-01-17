const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        msg: "User not authenticated",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_KEY);

    if (!decode) {
      return res.status(401).json({
        msg: "Invalid Token",
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = isAuthenticated;
