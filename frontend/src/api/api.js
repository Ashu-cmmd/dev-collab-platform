import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://dev-collab-platform-bx9e.onrender.com/api",
  withCredentials: true,
});

// Attach token to every request automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Projects
export const getProjects = () => API.get("/projects");
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post("/projects", data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Chat
export const getChatHistory = (projectId) => API.get(`/chat/${projectId}`);