import React from "react";
import styled from "styled-components";
import { Link } from "react-router";
import { FiPlusCircle, FiList, FiBarChart2, FiUser } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import img from "../assets/images/app-logo.png";

const SidebarContainer = styled.div`
  width: 250px;
  height: 90vh;
  background-color: #000;
  padding: 2rem 1.5rem;
  color: #f1f3f5;
  border-right: 1px solid #2c2e33;
  display: flex;
  flex-direction: column;
`;

// const Logo = styled.div`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #00a8e8;
//   margin-bottom: 3rem;
// `;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: #f1f3f5;
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
  color: #f1f3f5;
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

export default function Sidebar() {
  return (
    <SidebarContainer>
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
    </SidebarContainer>
  );
}
