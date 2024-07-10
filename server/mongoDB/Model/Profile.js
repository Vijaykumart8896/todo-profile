const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
    },
    contact: {
      type: Number,
    }
  
  },
  { timestamps: true }
);

module.exports = model("profile", ProfileSchema);
