import React from "react";
import { Link } from "react-router";
import img from "../assets/images/not-found.svg";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <h2>You seem lost buddy ! </h2>
      <br />
      <img src={img} alt="Error" />

      <h4>
        <Link to="/">Go to Home</Link>
      </h4>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
  height: 100vh;
  display: flex;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h2 {
    font-size: 2rem;
    color: var(--primary-font-color);
    margin-bottom: 1rem;
    font-family: "Poppins", sans-serif;
  }
  h4 a {
    text-decoration: none;
    transition: color 0.3s ease;
  }
  h4 a:hover {
    color: var(--secondary-font-color);
  }
`;

export default Error;
