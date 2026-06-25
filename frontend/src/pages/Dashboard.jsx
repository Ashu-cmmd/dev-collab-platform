import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { getProjects, createProject, deleteProject } from "../api/api.js";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProject({ title, description });
      setTitle("");
      setDescription("");
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (err) {
      setError("Failed to delete project");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Dev Collab Platform</h1>
        <div>
          <span style={{ marginRight: "1rem" }}>Hi, {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.form}>
          <h3>Create a Project</h3>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleCreate}>
            <input
              style={styles.input}
              type="text"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              style={{ ...styles.input, height: "80px", resize: "vertical" }}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button style={styles.button} type="submit">Create Project</button>
          </form>
        </div>

        <div style={styles.projects}>
          <h3>All Projects</h3>
          {projects.length === 0 && <p>No projects yet. Create one!</p>}
          {projects.map((project) => (
            <div key={project._id} style={styles.card}>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <p style={styles.meta}>
                By {project.owner?.name} · Status: {project.status}
              </p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  style={styles.chatBtn}
                  onClick={() => navigate(`/chat/${project._id}`)}
                >
                  Open Chat →
                </button>
                {project.owner?._id === user?._id && (
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: "100vh", background: "#13131f", color: "#fff", fontFamily: "sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background: "#1e1e2e", borderBottom: "1px solid #333" },
  content: { display: "flex", gap: "2rem", padding: "2rem", maxWidth: "1100px", margin: "0 auto" },
  form: { width: "340px", flexShrink: 0 },
  projects: { flex: 1 },
  input: { display: "block", width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #444", background: "#2a2a3d", color: "#fff", boxSizing: "border-box" },
  button: { width: "100%", padding: "0.75rem", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  logoutBtn: { padding: "0.5rem 1rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  card: { background: "#1e1e2e", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", borderLeft: "3px solid #7c3aed" },
  meta: { color: "#888", fontSize: "0.85rem" },
  chatBtn: { padding: "0.4rem 0.8rem", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" },
  deleteBtn: { padding: "0.4rem 0.8rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" },
  error: { color: "#f87171" },
};

export default Dashboard;