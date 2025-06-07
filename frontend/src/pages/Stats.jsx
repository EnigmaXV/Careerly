import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import styled from "styled-components";

const Stats = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/stats");
      return response.data;
    },
  });

  const { defaultStats, monthlyApplications } = data || {};
  console.log(data);
  return (
    <Wrapper>
      <div className="chart-container">
        <h2>Job Status Distribution</h2>
        <DoughnutChart data={defaultStats} />
      </div>
      <div className="chart-container">
        <h2>Monthly Applications</h2>
        <LineChart data={monthlyApplications} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  background-color: var(--primary-theme);
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  justify-items: center;
  margin: 0 auto;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    justify-items: stretch;
  }

  .chart-container {
    background-color: var(--card-bg);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: var(--shadow-2);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 700px;
    margin-bottom: 2rem;
    height: 500px;
    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: var(--text-color);
    }
    .chart-canvas-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .chart-canvas-wrapper canvas {
      width: 100% !important;
      max-width: 600px;
      margin: 0 auto;
    }
  }
`;

export default Stats;
