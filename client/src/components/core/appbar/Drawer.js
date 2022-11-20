import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
//Icon
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonIcon from "@mui/icons-material/Person";
import { isAuthenticate, signout } from "../../auth/helper";

const Linkbar = ({ link, name, Component }) => {
  return (
    <ListItemButton
      component={NavLink}
      to={link}
      style={({ isActive }) => {
        return {
          color: isActive ? "#406882" : "#000",
        };
      }}
    >
      <Component sx={{ marginRight: "15px" }} />
      <Typography>{name}</Typography>
    </ListItemButton>
  );
};

const Drawers = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          <Linkbar link={"/"} name={"Home"} Component={HomeIcon} />
          {isAuthenticate() && (
            <>
              <Linkbar link={"/post"} name={"Post"} Component={PostAddIcon} />
              <Linkbar
                link={"/profile"}
                name={"Profile"}
                Component={PersonIcon}
              />
            </>
          )}

          {!isAuthenticate() && (
            <ListItemButton>
              <NavLink
                onClick={() => setOpen(false)}
                to={"/signin"}
                className={"navLink"}
                style={({ isActive }) => {
                  return {
                    color: isActive && "#406882",
                  };
                }}
              >
                <Button variant="outlined">Sign in</Button>
              </NavLink>
            </ListItemButton>
          )}
          {isAuthenticate() && (
            <ListItemButton>
              <Button
                variant="outlined"
                onClick={() => {
                  signout(() => {
                    setOpen(false);
                    navigate("/");
                  });
                }}
              >
                Sign out
              </Button>
            </ListItemButton>
          )}
        </List>
      </Drawer>
      <IconButton sx={{ marginLeft: "auto" }} onClick={() => setOpen(!open)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Drawers;
