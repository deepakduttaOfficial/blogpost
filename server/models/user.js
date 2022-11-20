const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    totalPost: {
      type: Number,
      default: 0,
    },
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
