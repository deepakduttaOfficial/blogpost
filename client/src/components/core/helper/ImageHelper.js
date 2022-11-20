import { CardMedia } from "@mui/material";
import React from "react";
import { API } from "../../../backend";

export const ImageHelper = ({ post }) => {
  let imageUrl = post.image
    ? `${API}/posts/image/${post._id}`
    : "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500001/134557215-no-thumbnail-images-placeholder-for-forums-blogs-and-websites.jpg?ver=6";
  return (
    <CardMedia
      component="img"
      height="194"
      sx={{ width: "400px" }}
      image={imageUrl}
      alt="Post"
    />
  );
};
export const SingleImageHelper = ({ post }) => {
  let imageUrl = post.image
    ? `${API}/posts/image/${post._id}`
    : "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500001/134557215-no-thumbnail-images-placeholder-for-forums-blogs-and-websites.jpg?ver=6";
  return (
    <CardMedia
      component="img"
      sx={{
        maxWidth: "40rem",
        minWidth: "20rem",
        margin: "auto",
        padding: "4px 10px 0px 10px",
      }}
      image={imageUrl}
      alt="Post"
    />
  );
};
