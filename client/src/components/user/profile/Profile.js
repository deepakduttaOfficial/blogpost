import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Base from "../../core/Base";
import { TypographyFeild } from "../UserCore";
import ProfileGride1 from "./UserInfo";
import ProfileGride2 from "./getUser/ManageProfileNavigation";
import { isAuthenticate } from "../../auth/helper";
import { getuser } from "../helper";

const Profile = () => {
  const { token, user } = isAuthenticate();
  const [info, setInfo] = useState({
    name: "",
    email: "",
    totalPost: "",
    posts: [],
  });
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name, email, totalPost, posts } = info;
  const getUser = () => {
    setLoading(true);
    getuser(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      }
      setInfo(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    getUser();
  }, [reload]);

  return (
    <Base>
      <Container maxWidth="md">
        <TypographyFeild TypographyText={`WellCome ${user.name}`} />
        <Box>
          <Box container>
            <Box
              sx={{
                minWidth: "20rem",
                maxWidth: "30rem",
                margin: "5px auto",
                padding: "5px",
              }}
            >
              <ProfileGride1 name={name} email={email} totalPost={totalPost} />
            </Box>
            <Box
              sx={{
                minWidth: "20rem",
                maxWidth: "100%",
                margin: "5px 0px",
                padding: "5px",
              }}
            >
              <ProfileGride2
                name={name}
                email={email}
                totalPost={totalPost}
                posts={posts}
                reload={reload}
                setReload={setReload}
                loading={loading}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Base>
  );
};

export default Profile;
