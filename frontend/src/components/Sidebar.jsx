import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import { FiPlusCircle, FiList, FiBarChart2, FiUser } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import axios from "axios";

const SidebarContainer = styled.div`
  width: 250px;
  height: 90vh;
  background-color: var(--sidebar-bg-color);
  padding: 2rem 1.5rem;
  color: var(--primary-font-color);
  border-right: 1px solid #2c2e33;
  display: flex;
  flex-direction: column;
  position: fixed;
`;

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

export default function Sidebar() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: currentUser } = useQuery({
    queryKey: ["user"],
  });
  const isAdmin = currentUser?.role === "admin";

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.get("/api/auth/logout");
      return res.data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
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
          <StyledLink to="/dashboard/add-job">
            <FiPlusCircle /> Add Job
          </StyledLink>
          <StyledLink to="/dashboard/all-jobs">
            <FiList /> All Jobs
          </StyledLink>
          <StyledLink to="/dashboard/stats">
            <FiBarChart2 /> Stats
          </StyledLink>
          <StyledLink to="/dashboard/profile">
            <FiUser /> Profile
          </StyledLink>
          {isAdmin && (
            <StyledLink to="/dashboard/admin">
              <MdOutlineAdminPanelSettings /> Admin
            </StyledLink>
          )}
        </Nav>

        <Logout onClick={() => logoutMutation.mutate()}>
          <LuLogOut /> Logout
        </Logout>
      </div>
    </SidebarContainer>
  );
}
