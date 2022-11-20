import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import UserPosts from "./UserPosts";
import Favoriute from "./Favoriute";

const ManageProfileNavigation = (props) => {
  const {
    name,
    email,
    totalPost,
    posts,
    loading,
    setReload = (f) => f,
    reload = undefined,
  } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Paper>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab icon={<PersonIcon />} label="User" />
            <Tab icon={<FavoriteIcon />} label="Favorite" />
          </Tabs>

          {/* {value === false && ""} */}
          {value === 0 && (
            <UserPosts
              name={name}
              email={email}
              totalPost={totalPost}
              posts={posts}
              reload={reload}
              setReload={setReload}
              loading={loading}
            />
          )}
          {value === 1 && <Favoriute />}
        </Box>
      </Paper>
    </>
  );
};

export default ManageProfileNavigation;
