import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Fab,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { isAuthenticate } from "../../../../auth/helper";
import Base from "../../../../core/Base";
import { AlertFeild, InputFeild, TypographyFeild } from "../../../UserCore";
import { updatepost, getpost } from "../../../helper/index";
import { NavLink, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UpdateProfile = () => {
  const { postId } = useParams();
  const { user, token } = isAuthenticate();
  const [values, setValues] = useState({
    title: "",
    post: "",
    image: "",
    formData: "",
    error: false,
    loading: false,
    success: false,
  });
  const { title, post, error, image, formData, success, loading } = values;

  const getPost = () => {
    setValues({ ...values, loading: true });
    getpost(postId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      }
      setValues({
        ...values,
        loading: false,
        title: data.title,
        post: data.post,
        formData: new FormData(),
      });
    });
  };

  useEffect(() => {
    getPost();
  }, []);
  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      [name]: event.target.value,
      error: false,
      loading: false,
      success: false,
    });
  };
  const isSubmit = () => {
    setValues({
      ...values,
      error: false,
      success: false,
      loading: true,
    });
    updatepost(user._id, postId, token, formData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          title: "",
          post: "",
          image: "",
          error: false,
          success: true,
          loading: false,
        });
      }
    });
  };

  return (
    <Base>
      <Container maxWidth="sm">
        {success && (
          <AlertFeild
            severity={"success"}
            AlertHeader={"This post was Update"}
          />
        )}
        {error && (
          <AlertFeild
            severity={"error"}
            AlertHeader={"Update post Fail"}
            AlertBody={error}
          />
        )}
        <TypographyFeild TypographyText={`${user.name} Update Your post`} />
        <Box>
          <Paper elevation={2} sx={{ padding: "50px 40px" }}>
            <NavLink to={"/profile"}>
              <ArrowBackIcon color="primary" fontSize="medium" />
            </NavLink>
            <TextField
              type={"file"}
              value={image}
              onChange={handleChange("image")}
              fullWidth
              sx={{ margin: "5px" }}
            />
            <InputFeild
              label={"Title"}
              value={title}
              onChange={handleChange("title")}
              type={"text"}
            />
            <TextField
              label={"Make a post..."}
              fullWidth
              value={post}
              onChange={handleChange("post")}
              sx={{ margin: "5px" }}
              type={"text"}
              rows={8}
              multiline
            />
            <Stack spacing={2} sx={{ width: "100%", marginLeft: "5px" }}>
              <Fab color="primary">
                <AddIcon onClick={isSubmit} />
              </Fab>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Base>
  );
};

export default UpdateProfile;
