import React, { useState } from "react";
import FormInput from "../components/FormInput";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post("/api/auth/register", formData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      queryClient.setQueryData(["user"], data.user);
      console.log("Registration successful:", data);

      navigate("/dashboard");
    },
    onError: (error) => {
      console.error(
        "Registration error:",
        error.response?.data?.msg || error.message
      );
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const isLoading = registerMutation.isPending;

  return (
    <>
      <Wrapper>
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
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
            {isLoading ? "Signing up ..." : " sign up"}
          </button>
          <p>
            Do u have an account already ?{" "}
            <Link style={{ color: "var(--primary-button-color)" }} to="/login">
              Login
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
export default Register;
