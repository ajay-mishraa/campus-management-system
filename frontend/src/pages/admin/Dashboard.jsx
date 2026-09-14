import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard } from "../../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getAdminDashboard();

        setDashboardData(data?.data || data || {});
      } catch (error) {
        setMessage(error.message || "Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const getCount = (...keys) => {
    for (const key of keys) {
      if (dashboardData?.[key] !== undefined) {
        return dashboardData[key];
      }
    }

    return 0;
  };

  const totalStudents = getCount(
    "total_students",
    "students_count",
    "student_count",
    "students"
  );

  const totalFaculty = getCount(
    "total_faculty",
    "faculty_count",
    "faculties_count",
    "faculty"
  );

  const totalCourses = getCount(
    "total_courses",
    "courses_count",
    "course_count",
    "courses"
  );

  const totalSubjects = getCount(
    "total_subjects",
    "subjects_count",
    "subject_count",
    "subjects"
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to Campus Management System</p>
      </div>

      {message && (
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{loading ? "..." : totalStudents}</p>
        </div>

        <div className="stat-card">
          <h3>Total Faculty</h3>
          <p>{loading ? "..." : totalFaculty}</p>
        </div>

        <div className="stat-card">
          <h3>Total Courses</h3>
          <p>{loading ? "..." : totalCourses}</p>
        </div>

        <div className="stat-card">
          <h3>Total Subjects</h3>
          <p>{loading ? "..." : totalSubjects}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Quick Actions</h2>

          <div className="quick-actions">
            <button onClick={() => navigate("/admin/students")}>
              Manage Students
            </button>

            <button onClick={() => navigate("/admin/faculty")}>
              Manage Faculty
            </button>

            <button onClick={() => navigate("/admin/courses")}>
              Manage Courses
            </button>

            <button onClick={() => navigate("/admin/subjects")}>
              Manage Subjects
            </button>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>System Overview</h2>

          <p>
            Manage students, faculty, courses, subjects,
            attendance, marks and results from the admin panel.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;