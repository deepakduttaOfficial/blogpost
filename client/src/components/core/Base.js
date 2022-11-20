import React from "react";
import Appbar from "./appbar/Appbar";
import Footer from "./Footer";

const Base = (props) => {
  const { className = { marginTop: "67px", marginBottom: "50px" }, children } =
    props;
  return (
    <div>
      <Appbar />
      <div style={className}>{children}</div>
      <Footer />
    </div>
  );
};

export default Base;
