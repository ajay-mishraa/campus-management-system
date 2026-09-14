import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

function StudentLayout({ children }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-area">

        <Navbar />

        <main className="main-content">
          {children}
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default StudentLayout;