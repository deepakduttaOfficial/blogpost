const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body } = require("express-validator");
const { signup, signin, emailVerification } = require("../controllers/auth");

//SIGN UP ROUTE------------>
router.post(
  "/signup",
  [
    body("name", "Name must be requied").isLength({ min: 1 }),
    body("email", "Email required").isLength({ min: 1 }),
    body("email", "Invalid Email").isEmail(),
    body("email").custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
    body("password", "Password must be requied").isLength({ min: 1 }),
  ],
  signup
);
//SIGN IN ROUTE -------------->
router.post(
  "/signin",
  [
    body("email", "Email required").isLength({ min: 1 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Password must be requied").isLength({ min: 1 }),
  ],
  signin
);

// Mail varification
router.get("/user/verify-email/:token", emailVerification);

//SIGN OUT ROUTE ------------>
router.get("/signout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    massage: "User sign out",
  });
});

module.exports = router;
