import { useEffect, useState } from "react";
import { getCourses, deleteData } from "../../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getCourses();

      const courseList = Array.isArray(data)
        ? data
        : Array.isArray(data?.courses)
        ? data.courses
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setCourses(courseList);
    } catch (error) {
      setMessage(error.message || "Unable to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await deleteData(`/courses/${id}`);
      await loadCourses();
    } catch (error) {
      setMessage(error.message || "Unable to delete course");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Courses</h1>
          <p>Manage all courses in the campus</p>
        </div>

        <button
          className="auth-button"
          onClick={() =>
            setMessage("Add Course form will be connected next.")
          }
        >
          + Add Course
        </button>
      </div>

      {message && (
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      )}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Course List</h2>

          <span>
            Total Courses: {courses.length}
          </span>
        </div>

        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Course Name</th>
                  <th>Course Code</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id || index}>
                    <td>{course.id || index + 1}</td>

                    <td>
                      {course.course_name ||
                        course.name ||
                        "-"}
                    </td>

                    <td>{course.course_code || "-"}</td>

                    <td>{course.duration || "-"}</td>

                    <td>
                      <button
                        className="action-button"
                        onClick={() =>
                          setMessage(
                            `Course: ${
                              course.course_name ||
                              course.name ||
                              "Unknown"
                            }`
                          )
                        }
                      >
                        View
                      </button>

                      {course.id && (
                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(course.id)
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

export default Courses;