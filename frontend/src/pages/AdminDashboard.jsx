import React from "react";
import styled from "styled-components";
import { FaUsers, FaClipboardList, FaFire, FaFlag } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

const AdminDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminSummary"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/admin-stats");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const summaryCardsData = [
    {
      label: "Users",
      value: data?.allUsers || 0,
      icon: <FaUsers />,
      color: "#4F8CFF",
    },
    {
      label: "Job Posts",
      value: data?.allJobs || 0,
      icon: <FaClipboardList />,
      color: "#FF8C42",
    },
  ];

  if (isLoading) {
    return (
      <Wrapper>
        <div className="loading">Loading dashboard data...</div>
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <Wrapper>
        <div className="error">Error loading dashboard data.</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="summary-cards">
        {summaryCardsData.map((item) => (
          <div className="summary-card" key={item.label}>
            <div
              className="icon"
              style={{ background: item.color + "22", color: item.color }}
            >
              {item.icon}
            </div>
            <div className="info">
              <div className="value">{item.value}</div>
              <div className="label">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="activity-section">
        <h2>Recent Active Users & Their Job Posts</h2>
        {data?.activeUsers?.length > 0 ? (
          <div className="activity-table-wrapper">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>position</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {data.activeUsers.map((user) => {
                  const isActieNow =
                    user.lastActive === "0 minutes ago"
                      ? "Active Now"
                      : user.lastActive;
                  return (
                    <tr key={user._id}>
                      <td className="user-name">{user.name}</td>
                      <td>
                        {user.jobs && user.jobs.length > 0 ? (
                          <div className="job-cards-list">
                            {user.jobs.map((job) => (
                              <div key={job._id} className="job-card-inline">
                                <div className="job-position">{job.position}</div>
                                <div className="job-company">at {job.company}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          "No jobs posted"
                        )}
                      </td>
                      <td>
                        {user.jobs && user.jobs.length > 0 ? (
                          <div className="job-cards-list">
                            {user.jobs.map((job) => (
                              <div key={job._id} className="job-card-inline">
                                <div className="job-company">{job.company}</div>
                                <div className="job-position">{job.position}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          "No companies listed"
                        )}
                      </td>
                      <td>{user.location || "N/A"}</td>
                      <td>{isActieNow || "N/A"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-active-users">No active users found recently.</div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem 1rem;
  background: var(--background-color);
  border-radius: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

  .dashboard-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--primary-700, #22223b);
    text-align: center;
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .summary-card {
    background: var(--navbar-bg-color, #fff);
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    transition: box-shadow 0.2s;
    border: 1px solid var(--border-color, #ececec);
    min-width: 0;
    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
    .icon {
      font-size: 2rem;
      border-radius: 0.75rem;
      padding: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f0f4ff;
    }
    .info {
      .value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary-700, #22223b);
      }
      .label {
        font-size: 1rem;
        color: var(--text-secondary-color, #6c6c80);
        margin-top: 0.25rem;
      }
    }
  }

  .activity-section {
    margin-top: 2.5rem;
    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--primary-700, #22223b);
    }
    .activity-table-wrapper {
      background: var(--navbar-bg-color, #fff);
      border-radius: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      padding: 1.5rem 1rem;
      overflow-x: auto;
    }
    .activity-table {
      width: 100%;
      border-collapse: collapse;
      th,
      td {
        padding: 0.75rem 1rem;
        text-align: left;
        font-size: 1rem;
      }
      th {
        color: var(--text-secondary-color, #6c6c80);
        font-weight: 600;
        border-bottom: 2px solid var(--border-color, #ececec);
      }
      td {
        color: var(--primary-700, #22223b);
        border-bottom: 1px solid var(--border-color, #ececec);
      }
      .user-name {
        font-weight: 600;
        color: var(--primary-button-color, #4f8cff);
      }
      tr:last-child td {
        border-bottom: none;
      }
    }
  }

  .job-cards-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .job-card-inline {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    color: var(--text-color);
    display: flex;
    gap: 0.5rem;
    align-items: baseline;

    .job-position {
      font-weight: 600;
      color: var(--primary-700);
    }

    .job-company {
      color: var(--text-secondary-color);
    }
  }

  .no-active-users {
    text-align: center;
    padding: 2rem;
    color: var(--text-secondary-color);
    font-size: 1.1rem;
  }

  @media (max-width: 600px) {
    .summary-cards {
      grid-template-columns: 1fr;
    }
    .activity-table-wrapper {
      padding: 1rem 0.25rem;
    }
    .activity-table th,
    .activity-table td {
      padding: 0.5rem 0.5rem;
      font-size: 0.95rem;
    }
  }
`;

export default AdminDashboard;
