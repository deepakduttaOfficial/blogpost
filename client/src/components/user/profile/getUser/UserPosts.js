import React from "react";
import { Box, Container, Grid, LinearProgress } from "@mui/material";
import ManageProfile from "./manageprofile/ManageProfile";
import { TypographyFeild } from "../../UserCore";

const UserPosts = (props) => {
  const { posts, setReload = (f) => f, reload = undefined, loading } = props;
  let postsLength = posts.length;

  return (
    <Container sx={{ margin: "5px" }}>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      {!loading && postsLength === 0 ? (
        <Container>
          <TypographyFeild TypographyText={`No post Here ! make a post`} />
        </Container>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post, index) => {
            return (
              <Grid item key={index}>
                <ManageProfile
                  title={post.title}
                  postBody={post.post}
                  id={post._id}
                  createdAt={post.createdAt}
                  post={post}
                  reload={reload}
                  setReload={setReload}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default UserPosts;
