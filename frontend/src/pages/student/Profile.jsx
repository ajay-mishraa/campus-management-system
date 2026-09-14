import { useEffect, useState } from "react";
import { getProfile } from "../../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        if (data.user) {
          setUser(data.user);
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }
      } catch (error) {
        setError(error.message || "Unable to fetch profile");

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-section">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <h1>My Profile</h1>
          <p>View your account information</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-warning">
          {error}
        </div>
      )}

      <div className="dashboard-section">

        <div className="profile-card">

          <div className="profile-avatar">
            {user?.full_name
              ? user.full_name.charAt(0).toUpperCase()
              : "S"}
          </div>

          <div className="profile-info">

            <h2>
              {user?.full_name || "Student"}
            </h2>

            <p>
              <strong>Email:</strong>{" "}
              {user?.email || "-"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {user?.phone || "-"}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user?.role || "student"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;