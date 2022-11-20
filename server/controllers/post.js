const Post = require("../models/post");
const User = require("../models/user");
const _ = require("lodash");

//CREATE CONTROLLER --------->
exports.postUser = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      error: "Title must be required",
    });
  }
  if (!req.body.post) {
    return res.status(400).json({
      error: "Post body must be required",
    });
  }

  const post = new Post({
    title: req.body.title,
    post: req.body.post,
    user: req.profile._id,
  });
  if (req.file) {
    (post.image.data = req.file.buffer),
      (post.image.contentType = req.file.mimetype);
  }
  post.save((err, post) => {
    if (err || !post) {
      return res.status(400).json({
        error: "POST NOT SAVE IN DB",
      });
    }

    User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $push: { posts: post._id } },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(400).json(err);
        }
      }
    );

    return res.status(200).json(post);
  });
};

//Middle Ware----??
exports.getPostById = (req, res, next, id) => {
  Post.findById(id)
    .populate("user", "name email _id ")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: "Post not found",
        });
      }
      req.post = post;
      next();
    });
};

// READ CONTROLLER -------->
exports.getPost = (req, res) => {
  return res.status(200).json(req.post);
};
exports.getAllPosts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Post.find()
    .populate("user", "name email")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(posts);
    });
};
exports.getImage = (req, res, next) => {
  if (req.post.image.data) {
    res.set("ContentType-Type", req.post.image.contentType);
    return res.send(req.post.image.data);
  }
  next();
};

// VERIFY IF USER IS CREATE POST ----??
exports.verifyUser = (req, res, next) => {
  let checker =
    req.profile && req.post && req.profile._id == req.post.user._id.toString();
  if (!checker) {
    return res.status(400).json({
      error: "You can not modify this post",
    });
  }
  next();
};

//UPDATE CONTROLLER ------->
exports.updatePost = (req, res) => {
  let post = req.post;
  console.log("hi");
  post = _.extend(post, req.body);
  if (req.file) {
    (post.image.data = req.file.buffer),
      (post.image.contentType = req.file.mimetype);
  }

  post.save((err, post) => {
    if (err || !post) {
      return res.status(400).json({
        error: "Update fail",
      });
    }
    post.image = undefined;
    return res.status(200).json(post);
  });
};

//DELETE CONTROLLER----->
exports.deletePost = (req, res) => {
  const post = req.post;
  post.remove((err, remove) => {
    if (err) {
      return res.status(400).json({
        error: "Post not delete",
      });
    }
    return res.status(200).json(`${remove.title} was delete`);
  });
};
