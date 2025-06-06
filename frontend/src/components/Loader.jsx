import React from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const BouncingCircle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--primary-button-color);
  animation: ${bounce} 1s infinite;

  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.5s;
  }
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <BouncingCircle />
      <BouncingCircle />
      <BouncingCircle />
    </LoaderWrapper>
  );
};

export default Loader;
