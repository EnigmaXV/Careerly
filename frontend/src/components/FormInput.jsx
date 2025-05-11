import React from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

const FormInput = ({ type, value, placeholder, name, onChange }) => {
  return (
    <StyledWrapper>
      <label className="label">
        <span className="icon">
          {name === "name" && <FaUser size={20} />}
          {name === "password" && <RiLockPasswordFill size={20} />}
          {name === "email" && <MdEmail size={20} />}
        </span>
        <input
          type={type}
          className="input"
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  .label {
    position: relative;
    display: flex;
    align-items: center;

    border-radius: 6px;
    border: 2px solid #373737;
    padding: 15px 8px 15px 10px;

    &:focus-within {
      border-color: #999;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }

  .icon {
    margin-right: 10px;
    color: #c5c5c5;
  }

  .input {
    flex: 1;
    background-color: transparent;
    outline: none;
    border: none;
    color: #c5c5c5;
    font-size: 16px;
  }
`;

export default FormInput;
