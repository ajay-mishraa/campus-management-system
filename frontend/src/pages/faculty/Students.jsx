import { useEffect, useState } from "react";
import { getStudents } from "../../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getStudents();

      const studentList = Array.isArray(data)
        ? data
        : Array.isArray(data?.students)
        ? data.students
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setStudents(studentList);
    } catch (error) {
      setMessage(error.message || "Unable to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Students</h1>
          <p>View student academic information</p>
        </div>
      </div>

      {message && (
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      )}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Student List</h2>

          <span>
            Total Students: {students.length}
          </span>
        </div>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Enrollment No.</th>
                  <th>Course</th>
                  <th>Branch</th>
                  <th>Semester</th>
                  <th>Section</th>
                  <th>Gender</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id || index}>
                    <td>{student.id || index + 1}</td>

                    <td>{student.enrollment_no || "-"}</td>

                    <td>{student.course || "-"}</td>

                    <td>{student.branch || "-"}</td>

                    <td>{student.semester || "-"}</td>

                    <td>{student.section || "-"}</td>

                    <td>{student.gender || "-"}</td>
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

export default Students;