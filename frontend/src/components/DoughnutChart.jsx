import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const DoughnutChart = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/stats");

      return response.data;
    },
  });

  const { defaultStats } = data || {};
  const { monthlyApplications } = data || {};

  const chartData = {
    labels: ["Pending", "Interview", "Declined"],
    datasets: [
      {
        label: "Jobs",
        data: [
          defaultStats?.pending || 0,
          defaultStats?.interview || 0,
          defaultStats?.declined || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  const areaChartData = {
    labels: monthlyApplications?.map((item) => item.date) || [],
    datasets: [
      {
        label: "Monthly Applications",
        data: monthlyApplications?.map((item) => item.count) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Applications",
      },
    },
  };

  return (
    <div className="chart-container">
      {/* {isLoading ? <p>Loading...</p> : <Doughnut data={chartData} />} */}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Line data={areaChartData} options={options} />
      )}
    </div>
  );
};

export default DoughnutChart;
