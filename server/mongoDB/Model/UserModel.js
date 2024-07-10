const { model, Schema, trusted } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,

      unique: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
      default: null,
    },
    profiles: {
      type: [{ profile: { type: Schema.Types.ObjectId, ref: "profile" } }],
      
    },
  },
  { timestamps: true }
);

module.exports = model("user", UserSchema);
