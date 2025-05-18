import React from "react";
import Logo from "./Logo";
import Switch from "./Switch";
import styled from "styled-components";
import img from "../assets/images/avatar-2.jpg";
import Burger from "./Burger";

const Navbar = () => {
  return (
    <StyledWrapper>
      <Burger />
      <Logo />
      <div className="user">
        <Switch />
        <div className="user__img">
          <img src={img} alt="user" />
        </div>
        <div className="user__info">
          <span>Omar</span>
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
  position: relative;
  background-color: var(--navbar-bg-color);
  height: var(--nav-height);
  .user {
    display: flex;
    align-items: center;

    &__img {
      margin-left: 1rem;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    &__info {
      margin-left: 1rem;
      span {
        font-weight: bold;
      }
    }
  }
`;
const NavbarStyled = styled(Navbar)`
  ${StyledWrapper}
`;
export default Navbar;
