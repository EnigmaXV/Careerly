import React from "react";
import Logo from "./Logo";
import Switch from "./Switch";
import styled from "styled-components";
import img from "../assets/images/user-pic.jpg";
import Burger from "./Burger";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    staleTime: 0,
    notifyOnChangeProps: "all",
  });

  return (
    <StyledWrapper>
      <Burger />
      <Logo />
      <div className="user">
        <Switch />
        <div className="user__img">
          <img src={user?.profileImg || img} alt={user?.name || "user"} />
        </div>
        <div className="user__info">
          <span>{user?.name || "user"}</span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--navbar-bg-color);
  height: var(--nav-height);
  .user {
    display: flex;
    align-items: center;

    &__img {
      margin-left: 1rem;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    &__info {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      span {
        font-weight: bold;
      }

      .logout-btn {
        background: transparent;
        border: none;
        color: var(--primary-button-color);
        cursor: pointer;
        font-size: 0.9rem;
        padding: 0.25rem 0;
        transition: color 0.3s ease;

        &:hover {
          color: var(--secondary-button-color);
        }
      }
    }
  }
`;
const NavbarStyled = styled(Navbar)`
  ${StyledWrapper}
`;
export default Navbar;
