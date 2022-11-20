const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { varifyEmail } = require("../config/mailsend");

//SIGN UP------>
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Fail to user sign up",
      });
    }
    user.password = undefined;
    varifyEmail(req, req.body.email);
    res.status(200).json({
      massage: "Varify your email",
    });
  });
};
//SIGN IN------>
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const result = bcrypt.compareSync(password, user.password);
    if (result !== true) {
      return res.status(400).json({
        error: "Email and password could not match",
      });
    }

    const { _id, email, name, role } = user;
    let token = jwt.sign({ _id }, process.env.JSON_WEB_TOKEN);
    res.cookie("token", token, { expire: new Date() + 9999 });

    return res.status(200).json({ token, user: { _id, email, name, role } });
  });
};

// Email varification
exports.emailVerification = (req) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.TOKEN_VERIFY);
  console.log(decoded);
};

//MIDDLE WARE ----- ???
exports.isSignedIn = expressJwt({
  secret: process.env.JSON_WEB_TOKEN,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

exports.isAuthenticate = (req, res, next) => {
  let checker = req.auth && req.profile && req.auth._id == req.profile._id;
  if (!checker) {
    return res.status(400).json({
      error: "YOU ARE NOT AUTHENTICATE",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(400).json({
      error: "YOU ARE NOT ADMIN",
    });
  }
  next();
};
//---------??
