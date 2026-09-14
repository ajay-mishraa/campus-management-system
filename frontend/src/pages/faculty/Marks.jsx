import { useEffect, useState } from "react";
import { getMarks } from "../../services/api";

function Marks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadMarks = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getMarks();

      const marksList = Array.isArray(data)
        ? data
        : Array.isArray(data?.marks)
        ? data.marks
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setMarks(marksList);
    } catch (error) {
      setMessage(error.message || "Unable to load marks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarks();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Marks</h1>
          <p>Manage student examination marks</p>
        </div>

        <button
          className="auth-button"
          onClick={() =>
            setMessage("Add Marks form will be connected next.")
          }
        >
          + Add Marks
        </button>
      </div>

      {message && (
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      )}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Marks Records</h2>

          <span>
            Total Records: {marks.length}
          </span>
        </div>

        {loading ? (
          <p>Loading marks...</p>
        ) : marks.length === 0 ? (
          <p>No marks records found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student ID</th>
                  <th>Subject</th>
                  <th>Exam Type</th>
                  <th>Marks</th>
                  <th>Max Marks</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {marks.map((record, index) => (
                  <tr key={record.id || index}>
                    <td>{record.id || index + 1}</td>

                    <td>{record.student_id || "-"}</td>

                    <td>
                      {record.subject_name ||
                        record.subject_id ||
                        "-"}
                    </td>

                    <td>{record.exam_type || "-"}</td>

                    <td>{record.marks ?? "-"}</td>

                    <td>{record.max_marks ?? "-"}</td>

                    <td>
                      <button
                        className="action-button"
                        onClick={() =>
                          setMessage(
                            `Marks Record ID: ${
                              record.id || "-"
                            }`
                          )
                        }
                      >
                        View
                      </button>
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

export default Marks;