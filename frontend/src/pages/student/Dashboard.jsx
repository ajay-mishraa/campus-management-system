import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getStudentAttendance,
  getStudentMarks,
  getStudentResults,
} from "../../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        if (!user?.id) {
          throw new Error("Student information not found");
        }

        const [
          attendanceData,
          marksData,
          resultsData,
        ] = await Promise.all([
          getStudentAttendance(),
          getStudentMarks(),
          getStudentResults(user.id),
        ]);

        const attendanceList = Array.isArray(
          attendanceData?.attendance
        )
          ? attendanceData.attendance
          : Array.isArray(attendanceData?.data)
          ? attendanceData.data
          : Array.isArray(attendanceData)
          ? attendanceData
          : [];

        const marksList = Array.isArray(marksData?.marks)
          ? marksData.marks
          : Array.isArray(marksData?.data)
          ? marksData.data
          : Array.isArray(marksData)
          ? marksData
          : [];

        const resultsList = Array.isArray(resultsData?.marks)
          ? resultsData.marks
          : Array.isArray(resultsData?.results)
          ? resultsData.results
          : Array.isArray(resultsData?.data)
          ? resultsData.data
          : [];

        setAttendance(attendanceList);
        setMarks(marksList);
        setResults(resultsList);
      } catch (error) {
        console.error("Student dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const calculateAttendance = () => {
    if (attendance.length === 0) return 0;

    const presentCount = attendance.filter(
      (record) =>
        String(record.status || "").toLowerCase() === "present"
    ).length;

    return Math.round(
      (presentCount / attendance.length) * 100
    );
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome to Campus Management System</p>
        </div>
      </div>

      <div className="dashboard-grid">

        <div className="stat-card">
          <h3>Attendance</h3>
          <p>
            {loading
              ? "..."
              : `${calculateAttendance()}%`}
          </p>
        </div>

        <div className="stat-card">
          <h3>Subjects</h3>
          <p>
            {loading ? "..." : "3"}
          </p>
        </div>

        <div className="stat-card">
          <h3>Marks</h3>
          <p>
            {loading ? "..." : marks.length}
          </p>
        </div>

        <div className="stat-card">
          <h3>Results</h3>
          <p>
            {loading ? "..." : results.length}
          </p>
        </div>

      </div>

      <div className="dashboard-content">

        <div className="dashboard-section">
          <h2>Quick Access</h2>

          <div className="quick-actions">

            <button
              onClick={() =>
                navigate("/student/attendance")
              }
            >
              View Attendance
            </button>

            <button
              onClick={() =>
                navigate("/student/marks")
              }
            >
              View Marks
            </button>

            <button
              onClick={() =>
                navigate("/student/results")
              }
            >
              View Results
            </button>

            <button
              onClick={() =>
                navigate("/student/profile")
              }
            >
              View Profile
            </button>

          </div>
        </div>

        <div className="dashboard-section">
          <h2>Academic Overview</h2>

          <p>
            View your attendance, examination marks,
            academic results and profile information
            from your student dashboard.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;