import React from "react";
import img from "../assets/images/careerlyBg.png";
import styled from "styled-components";
import { FaUserFriends } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import Logo from "../components/Logo";
import { Link } from "react-router";
const Landing = () => {
  return (
    <>
      <Wrapper>
        <Logo />
        <div className="landing">
          <div className="head-landing">
            <h1>Connect with professionals </h1>
            <h3>
              Find your next opportunity and grow your career with Careerly
            </h3>
          </div>
          <button>
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              Get started{" "}
            </Link>
          </button>

          <div className="features">
            <div className="feature">
              <FaUserFriends style={{ fontSize: "5rem", color: "a4a6a8" }} />
              <h4>Build your network</h4>
            </div>
            <div className="feature">
              <MdMessage style={{ fontSize: "5rem", color: "a4a6a8" }} />
              <h4>Explore job listing</h4>
            </div>
            <div className="feature">
              <BsPersonWorkspace
                style={{ fontSize: "5rem", color: "a4a6a8" }}
              />
              <h4>Share your knowledge</h4>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  height: 100vh;

  .landing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 3rem;

    h1 {
      font-size: 3rem;
      color: var(--primary-font-color);
      margin-bottom: 1rem;
      font-family: "Poppins", sans-serif;
    }
    h3 {
      font-size: 1.5rem;
      color: var(--secondary-font-color);
      margin-bottom: 2rem;
    }
    button {
      background-color: var(--primary-button-color);
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 5px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--secondary-button-color);
      }
    }
  }
  .features {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    margin-top: 3rem;
  }
  .feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    h4 {
      font-size: 1.3rem;
      color: var(--primary-font-color);
    }
  }
`;

export default Landing;
