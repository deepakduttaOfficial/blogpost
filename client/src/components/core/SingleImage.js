import {
  Avatar,
  Card,
  CardHeader,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Base from "./Base";
import { getpost } from "./helper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SingleImageHelper } from "./helper/ImageHelper";

const SingleImage = () => {
  const { postId } = useParams();

  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const dateString = post.createdAt;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const getPost = (postId) => {
    setPost({ ...post, error: false });
    setLoading(true);
    getpost(postId).then((data) => {
      if (data.error) {
        console.log("Log");
      }
      setPost(data);
      setUser(data.user);
      setLoading(false);
    });
  };
  useEffect(() => {
    getPost(postId);
  }, []);
  return (
    <Base>
      <Container>
        <NavLink to={"/"}>
          <ArrowBackIcon color="primary" fontSize="large" />
        </NavLink>

        <Card sx={{ bgcolor: "#E8F9FD" }}>
          <Box
            sx={{
              margin: "0px auto ",
              maxWidth: "40rem",
              minWidth: "20rem",
            }}
          >
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: "#006E7F" }} />}
              title={
                <Typography variant="subtitle2">
                  {" "}
                  {loading ? "Lodding.." : user.name}
                </Typography>
              }
              subheader={loading ? "Loading.." : `${formatDate(dateString)}`}
            />
            <Typography variant="h4" component={"div"} margin={"2px 4px"}>
              {loading ? "Lodding.." : post.title}
            </Typography>
          </Box>
          <Box
            sx={{
              margin: "0px auto ",
              maxWidth: "40rem",
              minWidth: "20rem",
              bgcolor: "#fff",
            }}
          >
            <SingleImageHelper post={post} />
            <Paper sx={{ padding: "10px" }}>
              <Typography variant="h4" component={"div"} margin={"4px 0px"}>
                Post :
              </Typography>
              <Typography
                variant="button"
                component={"div"}
                margin={"10px 0px"}
              >
                {loading ? "Lodding.." : post.post}
              </Typography>
            </Paper>
          </Box>
        </Card>
      </Container>
    </Base>
  );
};

export default SingleImage;
