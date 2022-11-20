import { AppBar, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, backgroundColor: "#F7F5F2", color: "#000" }}
    >
      <Typography variant="subtitle1" align={"center"}>
        Create By Coder Deepak © {year}
      </Typography>
    </AppBar>
  );
};

export default Footer;
