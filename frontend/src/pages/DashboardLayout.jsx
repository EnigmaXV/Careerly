import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { useState, createContext, useContext } from "react";
import BigSidebar from "../components/BigSidebar";

const DashboardContext = createContext();
const DashboardLayout = ({ currentTheme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = {
    name: "Omar",
  };
  const [isDarkTheme, setIsDarkTheme] = useState(currentTheme);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        isDarkTheme,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleDarkTheme,
      }}
    >
      <Navbar />
      {isSidebarOpen && <Sidebar />}
      {isSidebarOpen && <BigSidebar />}
      <div className="dashboard-page">
        <Outlet />
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export default DashboardLayout;
