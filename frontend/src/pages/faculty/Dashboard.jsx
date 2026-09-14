import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStudents,
  getSubjects,
  getAttendance,
  getMarks,
} from "../../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [studentsCount, setStudentsCount] = useState(0);
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [marksCount, setMarksCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [studentsData, subjectsData, attendanceData, marksData] =
          await Promise.all([
            getStudents(),
            getSubjects(),
            getAttendance(),
            getMarks(),
          ]);

        const students = Array.isArray(studentsData)
          ? studentsData
          : studentsData?.students || studentsData?.data || [];

        const subjects = Array.isArray(subjectsData)
          ? subjectsData
          : subjectsData?.subjects || subjectsData?.data || [];

        const attendance = Array.isArray(attendanceData)
          ? attendanceData
          : attendanceData?.attendance || attendanceData?.data || [];

        const marks = Array.isArray(marksData)
          ? marksData
          : marksData?.marks || marksData?.data || [];

        setStudentsCount(students.length);
        setSubjectsCount(subjects.length);
        setAttendanceCount(attendance.length);
        setMarksCount(marks.length);
      } catch (error) {
        console.error("Faculty dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Faculty Dashboard</h1>
          <p>Welcome to Campus Management System</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{loading ? "..." : studentsCount}</p>
        </div>

        <div className="stat-card">
          <h3>Subjects</h3>
          <p>{loading ? "..." : subjectsCount}</p>
        </div>

        <div className="stat-card">
          <h3>Attendance Records</h3>
          <p>{loading ? "..." : attendanceCount}</p>
        </div>

        <div className="stat-card">
          <h3>Marks Records</h3>
          <p>{loading ? "..." : marksCount}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Quick Actions</h2>

          <div className="quick-actions">
            <button onClick={() => navigate("/faculty/attendance")}>
              Mark Attendance
            </button>

            <button onClick={() => navigate("/faculty/marks")}>
              Add Marks
            </button>

            <button onClick={() => navigate("/faculty/students")}>
              View Students
            </button>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Faculty Overview</h2>

          <p>
            Manage student attendance, marks and academic
            information from your faculty dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;