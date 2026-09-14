import { useEffect, useState } from "react";
import { getStudentResults } from "../../services/api";

function Results() {
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const user = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        if (!user?.id) {
          throw new Error("Student information not found");
        }

        const data = await getStudentResults(user.id);

        setResults(
          Array.isArray(data?.marks)
            ? data.marks
            : []
        );

        setSummary(data?.summary || null);
      } catch (error) {
        setError(
          error.message || "Unable to fetch results"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <h1>My Results</h1>
          <p>View your examination results</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {summary && (
        <div className="dashboard-grid">

          <div className="stat-card">
            <h3>Total Marks</h3>
            <p>
              {summary.total_marks}
            </p>
          </div>

          <div className="stat-card">
            <h3>Maximum Marks</h3>
            <p>
              {summary.total_max_marks}
            </p>
          </div>

          <div className="stat-card">
            <h3>Percentage</h3>
            <p>
              {summary.percentage}%
            </p>
          </div>

          <div className="stat-card">
            <h3>Result</h3>
            <p>
              {summary.result}
            </p>
          </div>

        </div>
      )}

      <div className="dashboard-section">

        <div className="section-header">
          <h2>Result Records</h2>

          <span>
            Total Records: {results.length}
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
                  <th>Subject Code</th>
                  <th>Subject</th>
                  <th>Exam Type</th>
                  <th>Marks</th>
                  <th>Maximum Marks</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>

                    <td>
                      {result.subject_code || "-"}
                    </td>

                    <td>
                      {result.subject_name || "-"}
                    </td>

                    <td>
                      {result.exam_type || "-"}
                    </td>

                    <td>
                      {result.marks ?? "-"}
                    </td>

                    <td>
                      {result.max_marks ?? "-"}
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