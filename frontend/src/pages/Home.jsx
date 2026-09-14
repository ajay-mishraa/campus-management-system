import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef4ff 0%, #f8fbff 50%, #ffffff 100%)",
        fontFamily: "Arial, sans-serif",
        color: "#1e293b",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 7%",
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#2563eb",
          }}
        >
          Campus Management System
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 22px",
              borderRadius: "8px",
              border: "1px solid #2563eb",
              background: "#ffffff",
              color: "#2563eb",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "10px 22px",
              borderRadius: "8px",
              border: "none",
              background: "#2563eb",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          minHeight: "480px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "70px 20px 50px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "850px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "30px",
              background: "#dbeafe",
              color: "#2563eb",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Smart Campus Management Platform
          </div>

          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 64px)",
              lineHeight: "1.1",
              margin: "0 0 22px",
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            Manage Your Campus
            <br />
            <span style={{ color: "#2563eb" }}>
              Smarter & Simpler
            </span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#64748b",
              margin: "0 auto 32px",
              maxWidth: "700px",
            }}
          >
            A centralized campus management system for
            managing students, faculty, courses, subjects,
            attendance, marks and academic results in one
            place.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "14px 32px",
                borderRadius: "9px",
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)",
              }}
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "14px 32px",
                borderRadius: "9px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                color: "#1e293b",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: "20px 7% 70px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              margin: "0 0 10px",
              color: "#0f172a",
            }}
          >
            Everything You Need
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            Manage your academic activities from one platform.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {/* Student */}
          <div
            style={{
              background: "#ffffff",
              padding: "28px 22px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(15, 23, 42, 0.06)",
            }}
          >
            <div style={{ fontSize: "38px", marginBottom: "12px" }}>
              🎓
            </div>

            <h3
              style={{
                margin: "0 0 10px",
                color: "#0f172a",
              }}
            >
              Students
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              View profile, attendance, marks and academic
              results.
            </p>
          </div>

          {/* Faculty */}
          <div
            style={{
              background: "#ffffff",
              padding: "28px 22px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(15, 23, 42, 0.06)",
            }}
          >
            <div style={{ fontSize: "38px", marginBottom: "12px" }}>
              👨‍🏫
            </div>

            <h3
              style={{
                margin: "0 0 10px",
                color: "#0f172a",
              }}
            >
              Faculty
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              Manage students, attendance and examination marks.
            </p>
          </div>

          {/* Admin */}
          <div
            style={{
              background: "#ffffff",
              padding: "28px 22px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(15, 23, 42, 0.06)",
            }}
          >
            <div style={{ fontSize: "38px", marginBottom: "12px" }}>
              🏫
            </div>

            <h3
              style={{
                margin: "0 0 10px",
                color: "#0f172a",
              }}
            >
              Administration
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              Manage faculty, students, courses, subjects and
              results.
            </p>
          </div>

          {/* Academic */}
          <div
            style={{
              background: "#ffffff",
              padding: "28px 22px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              textAlign: "center",
              boxShadow: "0 8px 25px rgba(15, 23, 42, 0.06)",
            }}
          >
            <div style={{ fontSize: "38px", marginBottom: "12px" }}>
              📊
            </div>

            <h3
              style={{
                margin: "0 0 10px",
                color: "#0f172a",
              }}
            >
              Academic Management
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              Keep attendance, marks and academic records
              organized.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "25px 20px",
          textAlign: "center",
          background: "#0f172a",
          color: "#cbd5e1",
          fontSize: "14px",
        }}
      >
        © 2026 Campus Management System. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;