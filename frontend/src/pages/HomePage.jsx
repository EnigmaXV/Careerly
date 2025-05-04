import React from "react";
import { Outlet } from "react-router";

const HomePage = () => {
  return (
    <>
      <div>Hey Averos</div>
      <Outlet />
    </>
  );
};

export default HomePage;
