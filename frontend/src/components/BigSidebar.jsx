import React from "react";
import styled from "styled-components";
import { Link } from "react-router";
import { FiPlusCircle, FiList, FiBarChart2, FiUser } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { useDashboardContext } from "../hooks/useDashboardContext";

const BigSidebar = () => {
  const { setIsSidebarOpen } = useDashboardContext();
  return (
    <Wrapper onClick={() => setIsSidebarOpen(false)}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <Nav>
          <StyledLink to="/add-job">
            <FiPlusCircle /> Add Job
          </StyledLink>
          <StyledLink to="/all-jobs">
            <FiList /> All Jobs
          </StyledLink>
          <StyledLink to="/stats">
            <FiBarChart2 /> Stats
          </StyledLink>
          <StyledLink to="/profile">
            <FiUser /> Profile
          </StyledLink>
        </Nav>

        <Logout>
          <LuLogOut /> Logout
        </Logout>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    background-color: var(--bigsidebar-bg-color);
    box-shadow: var(--shadow-4);
    margin-top: 20px;
    height: 100vh;
    padding: 1rem 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--primary-font-color);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #00a8e8;
    transform: translateX(3px);
  }

  & svg {
    font-size: 1.2rem;
  }
`;

const Logout = styled.div`
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--primary-font-color);
  text-decoration: none;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: #e63946;
    cursor: pointer;
  }

  & svg {
    font-size: 1.2rem;
  }
`;

export default BigSidebar;
