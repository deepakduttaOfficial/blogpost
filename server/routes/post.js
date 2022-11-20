const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//Auth controller
const { isSignedIn, isAuthenticate } = require("../controllers/auth");
//User controller
const { getUserById, totalPost } = require("../controllers/user");
//Main controller
const {
  postUser,
  getPostById,
  getPost,
  updatePost,
  verifyUser,
  getAllPosts,
  deletePost,
  getImage,
} = require("../controllers/post");

//Middle ware----???
router.param("postId", getPostById);
router.param("userId", getUserById);

//Create router---->
router.post(
  "/post/:userId",
  isSignedIn,
  isAuthenticate,
  upload.single("image"),
  totalPost,
  postUser
);

//GET POST----->
router.get("/post/:postId", getPost);
router.get("/posts", getAllPosts);
router.get("/posts/image/:postId", getImage);

//UPDATE POST---->
router.put(
  "/post/update/:userId/:postId",
  isSignedIn,
  isAuthenticate,
  verifyUser,
  upload.single("image"),
  updatePost
);

//DELETE POST-------->
router.delete(
  "/post/delete/:userId/:postId",
  isSignedIn,
  isAuthenticate,
  verifyUser,
  deletePost
);

module.exports = router;
