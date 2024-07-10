const UserSchema = require("../mongoDB/Model/UserModel");
const { createError } = require("../error");
const { genSalt, hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRETKEY } = require("../config/index");

// user register controller
const UserRegister = async (req, res, next) => {
  try {
    let { name, email, password, img } = req.body;
    const existUser = await UserSchema.findOne({ email });
    if (existUser) {
      return next(createError(409, "The User is already exists"));
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const user = await new UserSchema({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createUser = await user.save();

    const token = jwt.sign({ id: createUser._id }, JWT_SECRETKEY, {
      expiresIn: "9999 years",
    });

    return res.status(201).json({
      success: true,
      message: "Sucessfully registed user",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    return next(createError(400, "Failed to register the user"));
  }
};

// login user controller
const LogiIn = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    console.log(email);
    const existUser = await UserSchema.findOne({ email });
    if (!existUser) {
      return next(createError(401, "User is not found"));
    }
    const isPasswordCorrect = await compare(password, existUser.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Password is incorrect"));
    }

    const token = jwt.sign({ id: existUser._id }, JWT_SECRETKEY, {
      expiresIn: "9999 years",
    });

    return res
      .status(201)
      .cookie("id", token)
      .json({
        success: true,
        message: `Logged in successfully ${existUser.email}`,
        token,
        user: existUser,
      });
  } catch (error) {
    console.error(error);
    return next(createError(401, "Failed to LogIn"));
  }
};

module.exports = { UserRegister, LogiIn };
