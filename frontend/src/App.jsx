import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import AddJob from "./pages/AddJob";
import AllJobs from "./pages/AllJobs";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import DoughnutChart from "./components/DoughnutChart";

function App() {
  const getCurrentTheme = () => {
    const darkTheme = localStorage.getItem("darkTheme");
    if (darkTheme === "true") {
      document.body.classList.add("dark-theme");
      return true;
    } else {
      document.body.classList.remove("dark-theme");
      return false;
    }
  };
  const currentTheme = getCurrentTheme();
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="dashboard"
          element={<DashboardLayout currentTheme={currentTheme} />}
        >
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stats" element={<DoughnutChart />} />
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
