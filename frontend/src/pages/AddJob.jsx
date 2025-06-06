import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { FiBriefcase, FiMapPin, FiClock, FiCheckCircle } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";
import Loader from "../components/Loader";

const AddJob = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["user"],
  });
  const [formData, setFormData] = useState({
    company: "Apple",
    position: "Software Developer",
    status: "pending",
    jobType: "full-time",
    jobLocation: "Remote",
  });

  const addJobMutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post("/api/jobs", formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
      navigate("/dashboard/all-jobs");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    addJobMutation.mutate(formData);
  };

  if (addJobMutation.isPending) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <div className="form-container">
        <div className="form-header">
          <div className="header-content">
            <h1>Add New Job</h1>
            <p>Track your job applications with ease</p>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <div className="input-group">
                <FiBriefcase className="input-icon" />
                <div className="input-wrapper">
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g. Software Developer"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <FaRegBuilding className="input-icon" />
                <div className="input-wrapper">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Apple"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <FiMapPin className="input-icon" />
                <div className="input-wrapper">
                  <label htmlFor="jobLocation">Location</label>
                  <input
                    type="text"
                    name="jobLocation"
                    id="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleChange}
                    placeholder="e.g. New York"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <FiCheckCircle className="input-icon" />
                <div className="input-wrapper">
                  <label htmlFor="status">Status</label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="interview">Interview</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <FiClock className="input-icon" />
                <div className="input-wrapper">
                  <label htmlFor="jobType">Job Type</label>
                  <select
                    name="jobType"
                    id="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button
              type="submit"
              className="submit-btn"
              disabled={addJobMutation.isPending}
            >
              {addJobMutation.isPending ? "Adding Job..." : "Add Job"}
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: calc(100vh - 6rem);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--background-color);
  margin: 0 auto;

  .form-container {
    width: 100%;
    max-width: 900px;
    background-color: var(--navbar-bg-color);
    border-radius: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }

  .form-header {
    background: linear-gradient(
      135deg,
      var(--primary-button-color) 0%,
      var(--secondary-button-color) 100%
    );
    padding: 2.5rem 2rem;
    color: white;

    .header-content {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;

      h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        letter-spacing: -0.5px;
      }

      p {
        font-size: 1.1rem;
        opacity: 0.9;
      }
    }
  }

  .form {
    padding: 2rem;
  }

  .form-grid {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .form-group {
    .input-group {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background: var(--background-color);
      padding: 1rem;
      border-radius: 0.75rem;
      transition: all 0.2s ease;
      border: 1px solid var(--border-color);

      &:focus-within {
        box-shadow: 0 0 0 2px var(--primary-500);
        border-color: var(--primary-500);
      }
    }

    .input-icon {
      font-size: 1.25rem;
      color: var(--primary-500);
      margin-top: 0.25rem;
    }

    .input-wrapper {
      flex: 1;

      label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary-color);
        margin-bottom: 0.25rem;
      }

      input,
      select {
        width: 100%;
        padding: 0.5rem 0;
        font-size: 1rem;
        color: var(--text-color);
        background: transparent;
        border: none;
        outline: none;

        &::placeholder {
          color: var(--text-secondary-color);
          opacity: 0.7;
        }
      }

      select {
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right center;
        background-size: 1rem;
        padding-right: 1.5rem;
      }
    }
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 1px solid var(--grey-200);
  }

  .submit-btn {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background: var(--primary-button-color);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: var(--secondary-button-color);
      transform: translateY(-1px);
    }

    &:disabled {
      background: var(--grey-400);
      cursor: not-allowed;
      transform: none;
    }
  }

  @media (min-width: 768px) {
    .form-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default AddJob;
