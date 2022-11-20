const User = require("../models/user");

//MIDDLE WARE-----???
exports.getUserById = (req, res, next, id) => {
  User.findById(id)
    .populate("posts")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      req.profile = user;
      next();
    });
};

//Get single user---->
exports.getUser = (req, res) => {
  const user = req.profile;
  user.password = undefined;
  return res.status(200).json(user);
};
//GET ALL USERS------>
exports.getAllUsers = (req, res) => {
  User.find()
    .populate("posts")
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      users.map((user) => {
        user.password = undefined;
      });
      return res.status(200).json(users);
    });
};

exports.totalPost = (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $inc: { totalPost: +1 } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      next();
    }
  );
};
