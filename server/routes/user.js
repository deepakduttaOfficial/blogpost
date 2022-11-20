const express = require("express");
const { isSignedIn, isAuthenticate, isAdmin } = require("../controllers/auth");
const router = express.Router();
const { getUser, getUserById, getAllUsers } = require("../controllers/user");

//MIDDLE WARE ----??
router.param("userId", getUserById);

//READ ROUTER--------->
router.get("/user/:userId", isSignedIn, isAuthenticate, getUser);
router.get("/users/:userId", isSignedIn, isAuthenticate, isAdmin, getAllUsers);

module.exports = router;
