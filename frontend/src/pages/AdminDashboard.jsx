import React from "react";
import styled from "styled-components";
import { FaUsers, FaClipboardList, FaFire, FaFlag } from "react-icons/fa";

const summaryData = [
  {
    label: "Users",
    value: "35,210",
    icon: <FaUsers />,
    color: "#4F8CFF",
  },
  {
    label: "Job Posts",
    value: "8,214",
    icon: <FaClipboardList />,
    color: "#FF8C42",
  },
  {
    label: "Active Today",
    value: "1,032",
    icon: <FaFire />,
    color: "#FFB142",
  },
  {
    label: "Flagged Items",
    value: "23",
    icon: <FaFlag />,
    color: "#FF4F4F",
  },
];

const activityData = [
  {
    time: "2m ago",
    event: "New Signup",
    user: "johndoe",
    details: "Junior Developer",
  },
  {
    time: "5m ago",
    event: "Job Posted",
    user: "acme_corp",
    details: "Frontend Engineer",
  },
  {
    time: "10m ago",
    event: "Post Flagged",
    user: "user123",
    details: "Inappropriate content",
  },
];

const AdminDashboard = () => {
  return (
    <Wrapper>
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="summary-cards">
        {summaryData.map((item) => (
          <div className="summary-card" key={item.label}>
            <div className="icon" style={{ background: item.color + "22", color: item.color }}>
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
        <h2>Recent Activity</h2>
        <div className="activity-table-wrapper">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Event</th>
                <th>User</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {activityData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.time}</td>
                  <td>{row.event}</td>
                  <td className="user">{row.user}</td>
                  <td>{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);

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
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    transition: box-shadow 0.2s;
    border: 1px solid var(--border-color, #ececec);
    min-width: 0;
    &:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
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
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      padding: 1.5rem 1rem;
      overflow-x: auto;
    }
    .activity-table {
      width: 100%;
      border-collapse: collapse;
      th, td {
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
      .user {
        font-weight: 600;
        color: var(--primary-button-color, #4F8CFF);
      }
      tr:last-child td {
        border-bottom: none;
      }
    }
  }

  @media (max-width: 600px) {
    .summary-cards {
      grid-template-columns: 1fr;
    }
    .activity-table-wrapper {
      padding: 1rem 0.25rem;
    }
    .activity-table th, .activity-table td {
      padding: 0.5rem 0.5rem;
      font-size: 0.95rem;
    }
  }
`;

export default AdminDashboard; 