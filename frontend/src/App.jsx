import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/common/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";

import AdminLayout from "./layouts/AdminLayout";
import FacultyLayout from "./layouts/FacultyLayout";
import StudentLayout from "./layouts/StudentLayout";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminStudents from "./pages/admin/Students";
import AdminFaculty from "./pages/admin/Faculty";
import AdminCourses from "./pages/admin/Courses";
import AdminSubjects from "./pages/admin/Subjects";
import AdminAttendance from "./pages/admin/Attendance";
import AdminMarks from "./pages/admin/Marks";
import AdminResults from "./pages/admin/Results";

import FacultyDashboard from "./pages/faculty/Dashboard";
import FacultyStudents from "./pages/faculty/Students";
import FacultyAttendance from "./pages/faculty/Attendance";
import FacultyMarks from "./pages/faculty/Marks";

import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentAttendance from "./pages/student/Attendance";
import StudentMarks from "./pages/student/Marks";
import StudentResults from "./pages/student/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminStudents />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminFaculty />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminCourses />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/subjects"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminSubjects />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminAttendance />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/marks"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminMarks />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/results"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminResults />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyLayout>
                <FacultyDashboard />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/students"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyLayout>
                <FacultyStudents />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/attendance"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyLayout>
                <FacultyAttendance />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/marks"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyLayout>
                <FacultyMarks />
              </FacultyLayout>
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLayout>
                <StudentDashboard />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLayout>
                <StudentProfile />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLayout>
                <StudentAttendance />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/marks"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLayout>
                <StudentMarks />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/results"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLayout>
                <StudentResults />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;