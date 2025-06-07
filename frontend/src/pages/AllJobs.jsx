import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import {
  FiEdit2,
  FiTrash2,
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";
import axiosInstance from "../utils/axios";
import Modal from "../components/Modal";
import EditJobModal from "../components/EditJobModal";
import dayjs from "dayjs";
import { CiCalendarDate } from "react-icons/ci";
import Loader from "../components/Loader";

const AllJobs = () => {
  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const filters = {
    search,
    status,
    jobType,
    sort,
    page,
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/jobs?search=${filters.search}&status=${filters.status}&jobType=${filters.jobType}&sort=${filters.sort}&page=${filters.page}`
      );
      return response.data;
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: async (jobId) => {
      await axiosInstance.delete(`/jobs/${jobId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
      setDeleteModalOpen(false);
      setSelectedJob(null);
    },
    onError: (error) => {
      console.error(
        "Error deleting job:",
        error.response?.data?.msg || error.message
      );
    },
  });

  const handleEdit = (job) => {
    setSelectedJob(job);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedJob) {
      deleteJobMutation.mutate(selectedJob._id);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setJobType("all");
    setSort("latest");
  };

  if (isError) {
    return (
      <Wrapper>
        <div className="error">Error loading jobs. Please try again later.</div>
      </Wrapper>
    );
  }

  if (!isLoading && data?.jobs?.length === 0) {
    return (
      <Wrapper>
        <div className="no-jobs-message">
          <h2>No Jobs Found</h2>
          <p>
            It looks like you haven't added any jobs yet. Add a job to get
            started!
          </p>
          <br />
          <button
            className="search-again-btn"
            onClick={() => {
              setSearch("");
              setStatus("all");
              setJobType("all");
              setSort("latest");
            }}
          >
            Search again
          </button>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs-container">
        <div className="jobs-header">
          <h1>All Jobs</h1>
          <p>Manage your job applications</p>
        </div>

        <form className="form-filter" onSubmit={(e) => e.preventDefault()}>
          <div className="form-input-container">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search jobs..."
            />
          </div>
          <div className="form-row-select-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
            >
              {["all", "pending", "interview", "declined"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row-select-container">
            <label htmlFor="jobType">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={jobType}
              onChange={handleJobTypeChange}
            >
              {["all", "full-time", "part-time", "internship"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row-select-container">
            <label htmlFor="sort">Sort By</label>
            <select
              id="sort"
              name="sort"
              value={sort}
              onChange={handleSortChange}
            >
              {["latest", "oldest", "a-z", "z-a"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="clear-filters-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </form>

        <div className="jobs-grid">
          {data?.jobs?.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <div className="company-info">
                  <FaRegBuilding className="icon" />
                  <h3>{job.company}</h3>
                </div>
                <div className="job-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(job)}
                    title="Edit job"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(job)}
                    title="Delete job"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className="job-details">
                <div className="detail-item">
                  <FiBriefcase className="icon" />
                  <span>{job.position}</span>
                </div>
                <div className="detail-item">
                  <FiMapPin className="icon" />
                  <span>{job.jobLocation}</span>
                </div>
                <div className="detail-item">
                  <FiClock className="icon" />
                  <span>{job.jobType}</span>
                </div>
                <div className="detail-item">
                  <FiCheckCircle className="icon" />
                  <span className={`status${job.status}`}>{job.status}</span>
                </div>
              </div>
              <div className="job-created-at">
                <CiCalendarDate size={25} className="icon" />
                Created on {dayjs(job.createdAt).format("MMM D, YYYY")}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedJob(null);
        }}
        title="Delete Job"
      >
        <div className="delete-modal-content">
          <p>
            Are you sure you want to delete the job at{" "}
            <strong>{selectedJob?.company}</strong>?
          </p>
          <div className="modal-actions">
            <button
              className="cancel-btn"
              onClick={() => {
                setDeleteModalOpen(false);
                setSelectedJob(null);
              }}
            >
              Cancel
            </button>
            <button
              className="delete-btn"
              onClick={handleDeleteConfirm}
              disabled={deleteJobMutation.isPending}
            >
              {deleteJobMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

      <EditJobModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
      />

      {data?.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          {[...Array(data.totalPages)].map((_, i) => {
            const pageIndex = i + 1;
            return (
              <button
                key={pageIndex}
                className={pageIndex === page ? "active" : ""}
                onClick={() => setPage(pageIndex)}
              >
                {pageIndex}
              </button>
            );
          })}
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, data.totalPages))
            }
            disabled={page === data.totalPages}
          >
            Next
          </button>
          <button onClick={() => setPage(1)}>First page</button>
          <button onClick={() => setPage(data.totalPages)}>Last page</button>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: calc(100vh - 6rem);
  width: 100%;
  padding: 2rem;
  background: var(--background-color);

  .jobs-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .jobs-header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }

    p {
      color: var(--text-secondary-color);
      font-size: 1.1rem;
    }
  }

  .form-filter {
    background: var(--navbar-bg-color);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .form-input-container,
    .form-row-select-container {
      display: flex;
      flex-direction: column;
      label {
        font-size: 0.9rem;
        color: var(--text-secondary-color);
        margin-bottom: 0.5rem;
      }
      input,
      select {
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        font-size: 1rem;
        background: var(--background-color);
        color: var(--text-color);
      }
    }

    .clear-filters-btn {
      background: var(--red-dark);
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
      align-self: end;
      margin-top: 1rem;

      &:hover {
        background: #a30000;
      }
    }
  }

  .pagination {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 0.5rem;

    button {
      background: var(--navbar-bg-color);
      border: 1px solid var(--border-color);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 1rem;
      color: var(--text-color);

      &.active {
        background: var(--primary-500);
        color: white;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        background: var(--primary-button-color);
      }
    }
  }

  .jobs-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .job-card {
    background: var(--navbar-bg-color);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    .company-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .icon {
        font-size: 1.25rem;
        color: var(--primary-500);
      }

      h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-color);
      }
    }

    .job-actions {
      display: flex;
      gap: 0.5rem;

      button {
        background: none;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        border-radius: 0.5rem;
        transition: all 0.2s ease;
        color: var(--text-secondary-color);

        &:hover {
          background: var(--background-color);
        }

        &.edit-btn:hover {
          color: var(--primary-500);
        }

        &.delete-btn:hover {
          color: red;
        }
      }
    }
  }

  .job-details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-secondary-color);

      .icon {
        font-size: 1.1rem;
        color: var(--primary-500);
      }

      .status {
        text-transform: capitalize;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        font-weight: 500;

        &.pending {
          background: var(--yellow-100);
          color: var(--yellow-700);
        }

        &.interview {
          background: var(--blue-100);
          color: var(--blue-700);
        }

        &.declined {
          background: var(--red-100);
          color: var(--red-700);
        }
      }
    }
  }

  .job-created-at {
    font-size: 0.9rem;
    color: var(--text-secondary-color);
    text-align: right;
    margin-top: 0.5rem;
    border-top: 1px solid var(--secondary-button-color);
    padding-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    .icon {
      color: var(--primary-500);
    }
    justify-content: flex-end;
  }

  .loading,
  .error {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
    color: var(--text-secondary-color);
  }

  .no-jobs-message {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--navbar-bg-color);
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    max-width: 600px;
    margin: 4rem auto;

    h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--primary-700);
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.1rem;
      color: var(--text-secondary-color);
      line-height: 1.5;
    }
    button {
      background: var(--primary-500);
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background: var(--primary-600);
      }
    }
  }

  .error {
    color: var(--red-500);
  }

  .delete-modal-content {
    p {
      margin-bottom: 1.5rem;
      color: var(--text-color);
      font-size: 1.1rem;
      line-height: 1.5;

      strong {
        color: var(--primary-500);
      }
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;

      button {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;

        &.cancel-btn {
          background: var(--background-color);
          color: var(--text-color);
          border: 1px solid var(--border-color);

          &:hover {
            background: var(--primary-button-color);
          }
        }

        &.delete-btn {
          background: #ce303d;
          color: white;
          border: none;

          &:hover:not(:disabled) {
            background: var(--red-dark);
          }

          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        }
      }
    }
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export default AllJobs;
