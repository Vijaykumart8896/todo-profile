const jwt = require("jsonwebtoken");
const { JWT_SECRETKEY } = require("../config/index");
const { createError } = require("../error.js");

const verifyToken = async (req, res, next) => {
  try {
   
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }
    const token =req.headers.cookie.split("=")[1];
    if (!token) return next(createError(401, "You are not authenticated!"));
    const decode = jwt.verify(token, JWT_SECRETKEY);
    req.user = decode;
    return next();
  } catch (error) {
    console.error(error);
    return next(createError(401, "Something wrong!"));
  }
};

module.exports = { verifyToken };
