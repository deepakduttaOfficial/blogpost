import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Typography, MenuItem, Button } from "@mui/material";
import { isAuthenticate, signout } from "../../auth/helper";

const Linkbar = ({ link, name }) => {
  return (
    <MenuItem
      component={NavLink}
      to={link}
      style={({ isActive }) => {
        return {
          color: isActive ? "#406882" : "#000",
        };
      }}
    >
      <Typography textAlign="center">{name}</Typography>
    </MenuItem>
  );
};

const AllNavlink = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Linkbar link={"/"} name={"Home"} />
      {isAuthenticate() && (
        <>
          <Linkbar link={"/post"} name={"post"} />
          <Linkbar link={"/profile"} name={"Profile"} />
        </>
      )}
      {!isAuthenticate() && (
        <>
          <Box flexGrow={1} />
          <Linkbar link={"/signin"} name={"Sign in"} />
        </>
      )}
      {isAuthenticate() && (
        <>
          <Box flexGrow={1} />
          <Typography textAlign="center">
            <Button
              variant="outlined"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Sign out
            </Button>
          </Typography>
        </>
      )}
    </Box>
  );
};

export default AllNavlink;
