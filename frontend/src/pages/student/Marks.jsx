import { useEffect, useState } from "react";
import { getStudentMarks } from "../../services/api";

function Marks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const data = await getStudentMarks();

        const marksList = Array.isArray(data)
          ? data
          : Array.isArray(data?.marks)
          ? data.marks
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setMarks(marksList);
      } catch (error) {
        setError(error.message || "Unable to fetch marks");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>My Marks</h1>
          <p>View your examination marks</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
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
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Maximum Marks</th>
                  <th>Exam</th>
                </tr>
              </thead>

              <tbody>
                {marks.map((record, index) => (
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
                      {record.marks ??
                        record.obtained_marks ??
                        "-"}
                    </td>

                    <td>
                      {record.max_marks ??
                        record.maximum_marks ??
                        "-"}
                    </td>

                    <td>
                      {record.exam_name ||
                        record.exam_type ||
                        record.exam ||
                        "-"}
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