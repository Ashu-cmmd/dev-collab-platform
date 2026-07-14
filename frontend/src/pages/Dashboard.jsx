import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { useTheme } from "../context/ThemeContext.jsx";
import { getProjects, createProject, deleteProject } from "../api/api.js";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const d = theme === "dark" ? dark : light;

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch { setError("Failed to load projects"); }
  };
  
  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchProjects();
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProject({ title, description });
      setTitle(""); setDescription("");
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try { await deleteProject(id); fetchProjects(); }
    catch { setError("Failed to delete project"); }
  };

  return (
    <div style={{ ...s.page, background: d.pageBg, color: d.text, fontFamily: "sans-serif", minHeight: "100vh" }}>

      {/* NAV */}
      <div style={{ ...s.nav, background: d.navBg, borderBottom: `1px solid ${d.border}` }}>
        <div style={s.navLeft}>
          <div style={s.logoBox}><span style={{ color: "white", fontSize: "14px" }}>{"</>"}</span></div>
          <span style={{ fontWeight: 600, fontSize: "15px", color: d.text }}>Dev Collab</span>
        </div>
        <div style={s.navRight}>
          <span style={{ fontSize: "13px", color: d.textMuted }}>Hi, {user?.name}</span>
          <button
            onClick={toggleTheme}
            style={{ ...s.iconBtn, background: d.cardBg, border: `1px solid ${d.border}`, color: d.text }}
            title="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <div style={s.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
          <button onClick={() => { logout(); navigate("/login"); }} style={s.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* BODY */}
      <div style={s.body}>

        {/* SIDEBAR */}
        <div style={{ ...s.sidebar, background: d.sidebarBg, borderRight: `1px solid ${d.border}` }}>
          <span style={{ ...s.sidebarLabel, color: d.textMuted }}>Menu</span>
          {[
            { icon: "⊞", label: "Dashboard", active: true },
            { icon: "💬", label: "My Chats" },
            { icon: "👤", label: "Profile" },
          ].map(({ icon, label, active }) => (
            <div key={label} style={{
              ...s.navItem,
              background: active ? (theme === "dark" ? "rgba(124,58,237,0.2)" : "#f3f0ff") : "transparent",
              color: active ? "#a78bfa" : d.textMuted,
            }}>
              <span>{icon}</span> {label}
            </div>
          ))}

          <div style={{ marginTop: "auto" }}>
            <span style={{ ...s.sidebarLabel, color: d.textMuted }}>Your stats</span>
            <div style={{ ...s.statCard, background: theme === "dark" ? "rgba(124,58,237,0.1)" : "#f3f0ff", border: `1px solid ${theme === "dark" ? "rgba(124,58,237,0.2)" : "#e9d5ff"}` }}>
              <p style={{ fontSize: "11px", color: d.textMuted, marginBottom: "4px" }}>Projects created</p>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#a78bfa" }}>
                {projects.filter(p => p.owner?._id === user?._id).length}
              </h3>
            </div>
            <div style={{ ...s.statCard, marginTop: "8px", background: theme === "dark" ? "rgba(5,150,105,0.1)" : "#ecfdf5", border: `1px solid ${theme === "dark" ? "rgba(5,150,105,0.2)" : "#a7f3d0"}` }}>
              <p style={{ fontSize: "11px", color: d.textMuted, marginBottom: "4px" }}>Total projects</p>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#34d399" }}>{projects.length}</h3>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={s.main}>
          <div style={s.mainHeader}>
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: d.text }}>All Projects</h2>
          </div>

          {/* STATS ROW */}
          <div style={s.statsRow}>
            {[
              { label: "Total projects", val: projects.length },
              { label: "Your projects", val: projects.filter(p => p.owner?._id === user?._id).length },
              { label: "Open projects", val: projects.filter(p => p.status === "open").length },
            ].map(({ label, val }) => (
              <div key={label} style={{ ...s.statBox, background: d.cardBg, border: `1px solid ${d.border}` }}>
                <div style={{ fontSize: "11px", color: d.textMuted, marginBottom: "4px" }}>{label}</div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: d.text }}>{val}</div>
              </div>
            ))}
          </div>

          {error && <div style={s.errorBox}>{error}</div>}

          {/* PROJECT GRID */}
          <div style={s.grid}>
            {projects.map((project) => (
              <div key={project._id} style={{
                ...s.card,
                background: d.cardBg,
                border: `1px solid ${d.border}`,
                borderLeft: "3px solid #7c3aed",
              }}>
                <div style={s.cardTop}>
                  <h4 style={{ fontSize: "14px", fontWeight: 600, color: d.text }}>{project.title}</h4>
                  <span style={{ ...s.badge, background: theme === "dark" ? "rgba(5,150,105,0.15)" : "#ecfdf5", color: "#34d399", border: `1px solid ${theme === "dark" ? "rgba(5,150,105,0.3)" : "#a7f3d0"}` }}>
                    {project.status}
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: d.textMuted, lineHeight: "1.5" }}>{project.description}</p>
                <p style={{ fontSize: "11px", color: d.textMuted }}>By {project.owner?.name}</p>
                <div style={s.cardActions}>
                  <button
                    style={{ ...s.chatBtn, background: theme === "dark" ? "rgba(124,58,237,0.2)" : "#f3f0ff", border: `1px solid ${theme === "dark" ? "rgba(124,58,237,0.4)" : "#e9d5ff"}`, color: "#a78bfa" }}
                    onClick={() => navigate(`/chat/${project._id}`)}
                  >
                    Open Chat →
                  </button>
                  {project.owner?._id === user?._id && (
                    <button style={s.deleteBtn} onClick={() => handleDelete(project._id)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Empty state card */}
            <div
              style={{ ...s.card, background: "transparent", border: `1px dashed ${d.border}`, alignItems: "center", justifyContent: "center", cursor: "pointer", minHeight: "160px" }}
              onClick={() => document.getElementById("project-title-input")?.focus()}
            >
              <span style={{ fontSize: "24px", color: d.textMuted }}>+</span>
              <span style={{ fontSize: "13px", color: d.textMuted, marginTop: "8px" }}>Create a project</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ ...s.rightPanel, background: d.sidebarBg, borderLeft: `1px solid ${d.border}` }}>
          <span style={{ ...s.sidebarLabel, color: d.textMuted }}>New project</span>
          <form onSubmit={handleCreate} style={s.createForm}>
            <input
              id="project-title-input"
              style={{ ...s.input, background: d.inputBg, border: `1px solid ${d.border}`, color: d.text }}
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              style={{ ...s.input, background: d.inputBg, border: `1px solid ${d.border}`, color: d.text, height: "80px", resize: "vertical" }}
              placeholder="Describe your project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button style={s.createBtn} type="submit">+ Create</button>
          </form>
        </div>

      </div>
    </div>
  );
};

// ─── THEME TOKENS ───
const dark = {
  pageBg: "#0f0f1a",
  navBg: "#1a1a2e",
  sidebarBg: "#13131f",
  cardBg: "#1a1a2e",
  inputBg: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.07)",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.4)",
};

const light = {
  pageBg: "#f8f9fa",
  navBg: "#ffffff",
  sidebarBg: "#ffffff",
  cardBg: "#ffffff",
  inputBg: "#f9fafb",
  border: "#e5e7eb",
  text: "#111827",
  textMuted: "#6b7280",
};

// ─── STATIC STYLES ───
const s = {
  page: { display: "flex", flexDirection: "column" },
  nav: { height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", flexShrink: 0 },
  navLeft: { display: "flex", alignItems: "center", gap: "10px" },
  navRight: { display: "flex", alignItems: "center", gap: "10px" },
  logoBox: { width: "30px", height: "30px", background: "#7c3aed", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" },
  avatar: { width: "30px", height: "30px", background: "#7c3aed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: 600 },
  iconBtn: { width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" },
  logoutBtn: { background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", padding: "5px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" },
  body: { display: "flex", flex: 1, height: "calc(100vh - 56px)" },
  sidebar: { width: "200px", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "4px", flexShrink: 0 },
  sidebarLabel: { fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 8px", marginBottom: "4px", marginTop: "8px", display: "block" },
  navItem: { display: "flex", alignItems: "center", gap: "8px", padding: "7px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" },
  statCard: { borderRadius: "10px", padding: "12px" },
  main: { flex: 1, padding: "1.5rem", overflowY: "auto" },
  mainHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "1.5rem" },
  statBox: { borderRadius: "10px", padding: "14px" },
  errorBox: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", padding: "10px", borderRadius: "8px", fontSize: "13px", marginBottom: "1rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px" },
  card: { borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" },
  cardTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between" },
  badge: { fontSize: "10px", borderRadius: "999px", padding: "2px 8px", flexShrink: 0 },
  cardActions: { display: "flex", gap: "8px", marginTop: "4px" },
  chatBtn: { flex: 1, padding: "6px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: 500 },
  deleteBtn: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", borderRadius: "6px", padding: "6px 10px", fontSize: "12px", cursor: "pointer" },
  rightPanel: { width: "220px", padding: "1.5rem 1rem", flexShrink: 0 },
  createForm: { display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" },
  input: { width: "100%", padding: "8px 10px", borderRadius: "7px", fontSize: "12px", outline: "none", boxSizing: "border-box" },
  createBtn: { background: "#7c3aed", color: "white", border: "none", borderRadius: "7px", padding: "8px", fontSize: "12px", fontWeight: 500, cursor: "pointer", width: "100%" },
};

export default Dashboard;