import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import { FiBriefcase, FiMapPin, FiClock, FiCheckCircle, FiX } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";

const EditJobModal = ({ isOpen, onClose, job }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "",
    jobType: "",
    jobLocation: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company,
        position: job.position,
        status: job.status,
        jobType: job.jobType,
        jobLocation: job.jobLocation,
      });
    }
  }, [job]);

  const updateJobMutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.patch(`/jobs/${job._id}`, formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
      onClose();
    },
    onError: (error) => {
      console.error(
        "Error updating job:",
        error.response?.data?.msg || error.message
      );
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJobMutation.mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Edit Job</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
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
                type="button"
                className="cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={updateJobMutation.isPending}
              >
                {updateJobMutation.isPending ? "Updating..." : "Update Job"}
              </button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: var(--navbar-bg-color);
  border-radius: 1rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.2s ease;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(
    135deg,
    var(--primary-button-color) 0%,
    var(--secondary-button-color) 100%
  );
  color: white;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: white;
    border-radius: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;

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
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--grey-200);
  }

  .submit-btn,
  .cancel-btn {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .submit-btn {
    color: white;
    background: var(--primary-button-color);
    border: none;

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

  .cancel-btn {
    background: var(--background-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover {
      background: var(--primary-button-color);
      color: white;
      border-color: var(--primary-button-color);
    }
  }

  @media (min-width: 768px) {
    .form-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default EditJobModal; 