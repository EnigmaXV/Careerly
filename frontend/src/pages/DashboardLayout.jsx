import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useState, createContext, useContext } from "react";
import BigSidebar from "../components/BigSidebar";
import styled from "styled-components";

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
      <Wrapper>
        <Navbar />
        <div className="dashboard-page">
          {isSidebarOpen && <Sidebar />}
          <Outlet />
        </div>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

const Wrapper = styled.div`
  padding-top: var(--nav-height);
  .dashboard-page {
    display: flex;
    height: calc(100vh - var(--nav-height));
    width: 100%;
    background-color: var(--background-color);
  }
`;

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export default DashboardLayout;
