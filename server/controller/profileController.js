const { json } = require("express");
const ProfileSchema = require("../mongoDB/Model/Profile");
const { createError } = require("../error");

const CreateProfile = async (req, res, next) => {
  try {
    let { name, contact } = req.body;
    let userJWT = req.user;
    // console.log("user jwt token", userJWT);
    const profile = await ProfileSchema.findById(userJWT.id).populate({
      path: "profiles.profile",
      model: "user",
      ...req.body,
    });
    console.log(profile, "user info");

    return res.json({ profile });
    // let payload = await ProfileSchema({ ...req.body }).save();
    // return res.json({ payload });

    // if (user) {
    //   const profile = await ProfileSchema({ ...req.body }).papulate()
    //   return res.status(200).json({
    //     success: true,
    //     message: "Profile is created successfully",
    //     profile,
    //   });
    // } else {
    //   console.error(error);
    //   return next(createError(401, "Something Logging Error"));
    // }
  } catch (error) {
    console.error(error);
    return next(createError(500, "Unable create a profile"));
  }
};

module.exports = { CreateProfile };
