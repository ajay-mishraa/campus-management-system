import { useEffect, useState } from "react";
import {
  getStudents,
  createData,
  updateData,
  deleteData,
} from "../../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getStudents();

      const studentList =
        Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.students)
          ? data.students
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

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteData(`/students/${id}`);
      await loadStudents();
    } catch (error) {
      setMessage(error.message || "Unable to delete student");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Students</h1>
          <p>Manage all registered students.</p>
        </div>

        <button
          className="common-button"
          onClick={() => setMessage("Add Student form will be connected next.")}
        >
          Add Student
        </button>
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

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Enrollment No.</th>
                <th>Course</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9">Loading students...</td>
                </tr>
              ) : students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student.id || index}>
                    <td>{student.id || index + 1}</td>

                    <td>{student.full_name || "-"}</td>

                    <td>{student.email || "-"}</td>

                    <td>{student.phone || "-"}</td>

                    <td>{student.enrollment_no || "-"}</td>

                    <td>{student.course || "-"}</td>

                    <td>{student.branch || "-"}</td>

                    <td>{student.semester || "-"}</td>

                    <td>
                      <button
                        className="action-button"
                        onClick={() =>
                          setMessage(
                            `Student: ${student.full_name || "Unknown"}`
                          )
                        }
                      >
                        View
                      </button>

                      {student.id && (
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No students available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;