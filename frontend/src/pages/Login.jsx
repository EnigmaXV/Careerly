import React, { useState } from "react";
import FormInput from "../components/FormInput";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post("api/auth/login", formData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error.response.data.msg);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  //TODO implement demo user later
  const loginDemoUser = async () => {
    const demoData = {
      email: "test@test.com",
      password: "secret123",
    };
    loginMutation.mutate(formData);
  };

  const isLoading = loginMutation.isPending;
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {/* <button type="button" onClick={loginDemoUser} disabled={isLoading}>
            Explore the app
          </button> */}
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

  button {
    background-color: var(--primary-button-color);
    color: white;
    padding: 0.7rem 0.7rem;
    width: 100%;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background-color: var(--secondary-button-color);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;
export default Login;
