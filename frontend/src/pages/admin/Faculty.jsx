import { useEffect, useState } from "react";
import { getFaculty, deleteData } from "../../services/api";

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadFaculty = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getFaculty();

      const facultyList = Array.isArray(data)
        ? data
        : Array.isArray(data?.faculty)
        ? data.faculty
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setFaculty(facultyList);
    } catch (error) {
      setMessage(error.message || "Unable to load faculty");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this faculty member?"
    );

    if (!confirmDelete) return;

    try {
      await deleteData(`/faculty/${id}`);
      await loadFaculty();
    } catch (error) {
      setMessage(error.message || "Unable to delete faculty");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Faculty</h1>
          <p>Manage all faculty members</p>
        </div>

        <button
          className="auth-button"
          onClick={() =>
            setMessage("Add Faculty form will be connected next.")
          }
        >
          + Add Faculty
        </button>
      </div>

      {message && (
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      )}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Faculty List</h2>

          <span>
            Total Faculty: {faculty.length}
          </span>
        </div>

        {loading ? (
          <p>Loading faculty...</p>
        ) : faculty.length === 0 ? (
          <p>No faculty members found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {faculty.map((member, index) => (
                  <tr key={member.id || index}>
                    <td>{member.id || index + 1}</td>

                    <td>
                      {member.full_name || member.name || "-"}
                    </td>

                    <td>{member.email || "-"}</td>

                    <td>{member.phone || "-"}</td>

                    <td>{member.department || "-"}</td>

                    <td>{member.designation || "-"}</td>

                    <td>{member.qualification || "-"}</td>

                    <td>{member.experience || "-"}</td>

                    <td>
                      <button
                        className="action-button"
                        onClick={() =>
                          setMessage(
                            `Faculty: ${
                              member.full_name ||
                              member.name ||
                              "Unknown"
                            }`
                          )
                        }
                      >
                        View
                      </button>

                      {member.id && (
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(member.id)}
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

export default Faculty;