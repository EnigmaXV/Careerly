import React, { useState } from "react";
import FormInput from "../components/FormInput";
import styled from "styled-components";
import { Link } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // add your submit logic here
  };

  return (
    <>
      <Wrapper>
        <h1>Login</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <FormInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <button type="submit">Register</button>
          <p>
            Don't have an account ?{" "}
            <Link
              style={{ color: "var(--primary-button-color)" }}
              to="/register"
            >
              Register
            </Link>
          </p>
        </form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
  height: 100vh;
  max-width: 100vw;

  h1 {
    font-size: 2rem;
    color: var(--primary-font-color);

    font-family: "Poppins", sans-serif;
  }
  h1::first-letter {
    text-transform: uppercase;
    color: var(--primary-button-color);
  }

  .register-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .register-button {
    background-color: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: var(--secondary-color);
    }
  }
  button {
    background-color: var(--primary-button-color);
    color: white;
    padding: 0.7rem 0.7rem;
    width: 100%;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--secondary-button-color);
    }
  }
`;
export default Login;
