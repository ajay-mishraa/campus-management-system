const API_BASE_URL = "http://127.0.0.1:5000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

/* =========================
   AUTH APIs
   ========================= */

export const loginUser = (data) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const registerUser = (data) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/* =========================
   USER APIs
   ========================= */

export const getProfile = () => {
  return request("/auth/profile");
};

/* =========================
   ADMIN APIs
   ========================= */

export const getAdminDashboard = () => {
  return request("/auth/admin");
};

export const getStudents = () => {
  return request("/students");
};

export const getFaculty = () => {
  return request("/faculty");
};

export const getCourses = () => {
  return request("/courses");
};

export const getSubjects = () => {
  return request("/subjects");
};

export const getAttendance = () => {
  return request("/attendance");
};

export const getMarks = () => {
  return request("/marks");
};

/*
   Result API requires student ID
   Backend route:
   GET /api/result/<student_id>
*/

export const getResults = (studentId) => {
  return request(`/result/${studentId}`);
};

/* =========================
   STUDENT APIs
   ========================= */

export const getStudentAttendance = () => {
  return request("/attendance");
};

export const getStudentMarks = () => {
  return request("/marks");
};

export const getStudentResults = (studentId) => {
  return request(`/result/${studentId}`);
};

/* =========================
   GENERIC CRUD
   ========================= */

export const createData = (endpoint, data) => {
  return request(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateData = (endpoint, data) => {
  return request(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteData = (endpoint) => {
  return request(endpoint, {
    method: "DELETE",
  });
};

export default request;