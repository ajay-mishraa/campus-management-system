import { useEffect, useState } from "react";
import { getResults, getStudents } from "../../services/api";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadResults = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Get all students first
      const studentsData = await getStudents();

      const students = Array.isArray(studentsData)
        ? studentsData
        : Array.isArray(studentsData?.students)
        ? studentsData.students
        : Array.isArray(studentsData?.data)
        ? studentsData.data
        : [];

      // Get result for each student
      const resultResponses = await Promise.all(
        students.map(async (student) => {
          try {
            const data = await getResults(student.id);

            if (!data?.success || !data?.summary) {
              return null;
            }

            return {
              id: student.id,
              student_id: student.id,
              semester: student.semester,
              total_marks: data.summary.total_marks,
              percentage: data.summary.percentage,
              grade:
                data.summary.percentage >= 90
                  ? "A+"
                  : data.summary.percentage >= 80
                  ? "A"
                  : data.summary.percentage >= 70
                  ? "B+"
                  : data.summary.percentage >= 60
                  ? "B"
                  : data.summary.percentage >= 50
                  ? "C"
                  : data.summary.percentage >= 40
                  ? "D"
                  : "F",
            };
          } catch {
            // Student has no result yet
            return null;
          }
        })
      );

      const resultList = resultResponses.filter(
        (result) => result !== null
      );

      setResults(resultList);
    } catch (error) {
      setMessage(
        error.message || "Unable to load results"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Results</h1>
          <p>Manage student academic results</p>
        </div>

        <button
          className="auth-button"
          onClick={() =>
            setMessage(
              "Generate Result form will be connected next."
            )
          }
        >
          + Generate Result
        </button>
      </div>

      {message && (
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      )}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Result Records</h2>

          <span>
            Total Results: {results.length}
          </span>
        </div>

        {loading ? (
          <p>Loading results...</p>
        ) : results.length === 0 ? (
          <p>No result records found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student ID</th>
                  <th>Semester</th>
                  <th>Total Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result, index) => (
                  <tr key={result.id || index}>
                    <td>
                      {result.id || index + 1}
                    </td>

                    <td>
                      {result.student_id || "-"}
                    </td>

                    <td>
                      {result.semester || "-"}
                    </td>

                    <td>
                      {result.total_marks ?? "-"}
                    </td>

                    <td>
                      {result.percentage ?? "-"}%
                    </td>

                    <td>
                      {result.grade || "-"}
                    </td>

                    <td>
                      <button
                        className="action-button"
                        onClick={() =>
                          setMessage(
                            `Result ID: ${
                              result.id || "-"
                            }`
                          )
                        }
                      >
                        View
                      </button>

                      <button
                        className="action-button"
                        onClick={() =>
                          setMessage(
                            "Result editing will be connected next."
                          )
                        }
                      >
                        Edit
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

export default Results;