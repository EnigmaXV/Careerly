import React from "react";
import logo from "../assets/images/app-logo.png";
const Logo = () => {
  return (
    <div>
      <img
        src={logo}
        alt="Careerly Logo"
        style={{ width: "150px", height: "auto" }}
      />
    </div>
  );
};

export default Logo;
