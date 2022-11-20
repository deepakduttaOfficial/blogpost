import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Private from "./components/auth/helper/Private";
import Home from "./components/core/Home";
import SingleImage from "./components/core/SingleImage";
import Post from "./components/user/Post";
import UpdateProfile from "./components/user/profile/getUser/manageprofile/UpdateProfile";
import Profile from "./components/user/profile/Profile";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/post/:postId" element={<SingleImage />} />
        <Route path="/profile" element={<Private Component={Profile} />} />
        <Route
          path="/profile/update/:postId"
          element={<Private Component={UpdateProfile} />}
        />
        <Route path="/post" element={<Private Component={Post} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
