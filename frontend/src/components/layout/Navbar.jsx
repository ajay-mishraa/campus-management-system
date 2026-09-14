import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="navbar-brand">
        <h2>Campus Management System</h2>
      </div>

      <div className="navbar-right">

        <div className="navbar-user">
          <div className="user-avatar">
            {user?.full_name
              ? user.full_name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="user-details">
            <span className="user-name">
              {user?.full_name || "User"}
            </span>

            <span className="user-role">
              {user?.role || "User"}
            </span>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;