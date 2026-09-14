import { useEffect, useState } from "react";
import { getAttendance, deleteData } from "../../services/api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getAttendance();

      const attendanceList = Array.isArray(data)
        ? data
        : Array.isArray(data?.attendance)
        ? data.attendance
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setAttendance(attendanceList);
    } catch (error) {
      setMessage(error.message || "Unable to load attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {
      await deleteData(`/attendance/${id}`);
      await loadAttendance();
    } catch (error) {
      setMessage(
        error.message || "Unable to delete attendance record"
      );
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Attendance</h1>
          <p>Manage student attendance records</p>
        </div>

        <button
          className="auth-button"
          onClick={() =>
            setMessage("Mark Attendance form will be connected next.")
          }
        >
          + Mark Attendance
        </button>
      </div>

      {message && (
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      )}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Attendance Records</h2>

          <span>
            Total Records: {attendance.length}
          </span>
        </div>

        {loading ? (
          <p>Loading attendance...</p>
        ) : attendance.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student ID</th>
                  <th>Subject ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((record, index) => (
                  <tr key={record.id || index}>
                    <td>{record.id || index + 1}</td>

                    <td>{record.student_id || "-"}</td>

                    <td>{record.subject_id || "-"}</td>

                    <td>{record.attendance_date || "-"}</td>

                    <td>{record.status || "-"}</td>

                    <td>
                      <button
                        className="action-button"
                        onClick={() =>
                          setMessage(
                            `Attendance Record ID: ${
                              record.id || "-"
                            }`
                          )
                        }
                      >
                        View
                      </button>

                      {record.id && (
                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(record.id)
                          }
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;