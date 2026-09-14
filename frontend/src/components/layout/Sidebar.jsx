import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Students", path: "/admin/students" },
    { name: "Faculty", path: "/admin/faculty" },
    { name: "Courses", path: "/admin/courses" },
    { name: "Subjects", path: "/admin/subjects" },
    { name: "Attendance", path: "/admin/attendance" },
    { name: "Marks", path: "/admin/marks" },
    { name: "Results", path: "/admin/results" },
  ];

  const facultyLinks = [
    { name: "Dashboard", path: "/faculty" },
    { name: "Students", path: "/faculty/students" },
    { name: "Attendance", path: "/faculty/attendance" },
    { name: "Marks", path: "/faculty/marks" },
  ];

  const studentLinks = [
    { name: "Dashboard", path: "/student" },
    { name: "Profile", path: "/student/profile" },
    { name: "Attendance", path: "/student/attendance" },
    { name: "Marks", path: "/student/marks" },
    { name: "Results", path: "/student/results" },
  ];

  let links = [];

  if (role === "admin") {
    links = adminLinks;
  } else if (role === "faculty") {
    links = facultyLinks;
  } else if (role === "student") {
    links = studentLinks;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>CMS</h2>
        <p>Campus Management</p>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">
          {user?.full_name
            ? user.full_name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div>
          <h3>{user?.full_name || "User"}</h3>
          <span>{role || "User"}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;