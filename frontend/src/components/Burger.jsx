import React from "react";
import styled from "styled-components";
import { useDashboardContext } from "../hooks/useDashboardContext";

const Burger = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardContext();
  return (
    <StyledWrapper>
      <div
        className={`burger ${isSidebarOpen ? "open" : ""}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .burger {
    width: 40px;
    height: 30px;
    cursor: pointer;
    position: relative;
    display: block;
  }

  .burger span {
    position: absolute;
    height: 4px;
    width: 100%;
    background: var(--primary-button-color);
    border-radius: 9px;
    left: 0;
    transition: 0.25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  .burger span:nth-of-type(3) {
    top: 100%;
    transform-origin: left center;
    transform: translateY(-100%);
  }

  .burger.open span:nth-of-type(1) {
    transform: rotate(45deg);
    top: 0;
    left: 5px;
  }

  .burger.open span:nth-of-type(2) {
    width: 0;
    opacity: 0;
  }

  .burger.open span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 28px;
    left: 5px;
  }
`;

export default Burger;
