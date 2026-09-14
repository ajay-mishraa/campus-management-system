import { useEffect, useState } from "react";
import { getStudentAttendance } from "../../services/api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getStudentAttendance();

        const attendanceList = Array.isArray(data)
          ? data
          : Array.isArray(data?.attendance)
          ? data.attendance
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setAttendance(attendanceList);
      } catch (error) {
        setError(
          error.message || "Unable to fetch attendance"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>My Attendance</h1>
          <p>View your attendance records</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
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
                  <th>Subject ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((record, index) => (
                  <tr key={record.id || index}>
                    <td>
                      {record.id || index + 1}
                    </td>

                    <td>
                      {record.subject_name ||
                        record.subject_id ||
                        "-"}
                    </td>

                    <td>
                      {record.attendance_date ||
                        record.date ||
                        "-"}
                    </td>

                    <td>
                      {record.status || "-"}
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