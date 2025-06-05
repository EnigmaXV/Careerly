import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import { FiUser, FiMail, FiMapPin } from "react-icons/fi";

const Profile = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useQuery({
    queryKey: ["user"],
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    profileImage: null,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        location: userData.location || "",
        profileImage: userData.profileImg || null,
      });
    }
  }, [userData]);

  // Mutation for updating user data
  const updateUserMutation = useMutation({
    mutationFn: async (updatedData) => {
      const submitFormData = new FormData();
      submitFormData.append("name", updatedData.name);
      submitFormData.append("email", updatedData.email);
      submitFormData.append("location", updatedData.location);

      if (updatedData.profileImage instanceof File) {
        submitFormData.append("profileImage", updatedData.profileImage);
      }

      const { data } = await axiosInstance.patch("/users/me", submitFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      queryClient.setQueryData(["user"], (oldData) => ({
        ...oldData,
        name: data.name,
        email: data.email,
        location: data.location,
        profileImg: data.profileImg,
      }));
      alert("Profile updated successfully!");
    },
    onError: (error) => {
      console.error(
        "Error updating profile:",
        error.response?.data?.msg || error.message
      );
      alert(
        `Failed to update profile: ${
          error.response?.data?.msg || error.message
        }`
      );
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  const profileImageUrl =
    formData.profileImage instanceof File
      ? URL.createObjectURL(formData.profileImage)
      : formData.profileImage;
  return (
    <Wrapper>
      <div className="edit-form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>My Profile</h1>
            <p>Update your personal information and profile image</p>
          </div>
          {/* Profile Image Upload */}
          <div className="profile-image-upload">
            <div className="image-preview">
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="Profile Preview" />
              ) : (
                <FiUser className="placeholder-icon" />
              )}
            </div>
            <label htmlFor="profileImage" className="image-upload-label">
              {formData.profileImage ? "Change Image" : "Choose Image"}
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>

          {/* Form Fields */}
          <div className="form-grid">
            <div className="form-group">
              <div className="input-group">
                <FiUser className="input-icon" />
                <div className="input-wrapper">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <FiMail className="input-icon" />
                <div className="input-wrapper">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <FiMapPin className="input-icon" />
                <div className="input-wrapper">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-footer">
            <button
              type="submit"
              className="submit-btn"
              disabled={updateUserMutation.isPending}
            >
              {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
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

  .profile-card {
    background-color: var(--navbar-bg-color);
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    max-width: 600px;
    width: 100%;
    color: var(--text-color);
  }

  /* Styling for the Edit Form */
  .edit-form-container {
    /* Styles specific to the edit state */
    .form-header {
      margin-bottom: 1.5rem;
      h1 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--primary-700);
      }
      p {
        color: var(--text-secondary-color);
        font-size: 1rem;
      }
    }

    .form-grid {
      display: grid;
      gap: 1rem;
      margin-bottom: 1.5rem;
      @media (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .form-group {
      .input-group {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background-color: var(--background-color);
        border-radius: 0.5rem;
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        transition: border-color 0.2s ease, box-shadow 0.2s ease;

        &:focus-within {
          border-color: var(--primary-500);
          box-shadow: 0 0 0 1px var(--primary-500);
        }
      }

      .input-icon {
        font-size: 1.1rem;
        color: var(--primary-500);
      }

      .input-wrapper {
        flex: 1;
        label {
          display: block;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary-color);
          margin-bottom: 0.25rem;
        }
        input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: 1rem;
          color: var(--text-color);
          &::placeholder {
            color: var(--text-secondary-color);
            opacity: 0.7;
          }
        }
      }
    }

    .profile-image-upload {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      .image-preview {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid var(--primary-500);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--background-color);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .placeholder-icon {
          font-size: 2.5rem;
          color: var(--text-secondary-color);
        }
      }

      .image-upload-label {
        display: inline-block;
        background-color: var(--primary-button-color);
        color: white;
        padding: 0.6rem 1.2rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
        font-size: 0.9rem;

        &:hover {
          background-color: var(--secondary-button-color);
        }
      }

      .file-input {
        display: none;
      }
    }

    .form-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);

      .submit-btn {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
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
    }
  }

  .loading,
  .error {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
    color: var(--text-secondary-color);
  }

  .error {
    color: var(--red-500);
  }
`;

export default Profile;
