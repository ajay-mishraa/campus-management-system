import { useEffect, useState } from "react";
import { getSubjects, deleteData } from "../../services/api";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadSubjects = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getSubjects();

      const subjectList = Array.isArray(data)
        ? data
        : Array.isArray(data?.subjects)
        ? data.subjects
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setSubjects(subjectList);
    } catch (error) {
      setMessage(error.message || "Unable to load subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    try {
      await deleteData(`/subjects/${id}`);
      await loadSubjects();
    } catch (error) {
      setMessage(error.message || "Unable to delete subject");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Subjects</h1>
          <p>Manage all subjects in the campus</p>
        </div>

        <button
          className="auth-button"
          onClick={() =>
            setMessage("Add Subject form will be connected next.")
          }
        >
          + Add Subject
        </button>
      </div>

      {message && (
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      )}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Subject List</h2>

          <span>
            Total Subjects: {subjects.length}
          </span>
        </div>

        {loading ? (
          <p>Loading subjects...</p>
        ) : subjects.length === 0 ? (
          <p>No subjects found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={subject.id || index}>
                    <td>{subject.id || index + 1}</td>

                    <td>
                      {subject.subject_code || "-"}
                    </td>

                    <td>
                      {subject.subject_name ||
                        subject.name ||
                        "-"}
                    </td>

                    <td>
                      {subject.course ||
                        subject.course_name ||
                        "-"}
                    </td>

                    <td>{subject.semester || "-"}</td>

                    <td>
                      <button
                        className="action-button"
                        onClick={() =>
                          setMessage(
                            `Subject: ${
                              subject.subject_name ||
                              subject.name ||
                              "Unknown"
                            }`
                          )
                        }
                      >
                        View
                      </button>

                      {subject.id && (
                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(subject.id)
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

export default Subjects;