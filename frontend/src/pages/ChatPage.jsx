import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProject } from "../api/api.js";
import ChatBox from "../components/chat/ChatBox.jsx";
import useAuth from "../hooks/useAuth.js";
import { useTheme } from "../context/ThemeContext.jsx";

const ChatPage = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  const d = theme === "dark" ? dark : light;

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const fetchProject = async () => {
      try {
        const { data } = await getProject(projectId);
        setProject(data);
      } catch { setError("Project not found"); }
    };
    fetchProject();
  }, [projectId, user]);

  if (error) return (
    <div style={{ minHeight: "100vh", background: d.pageBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171", fontFamily: "sans-serif" }}>
      {error}
    </div>
  );

  if (!project) return (
    <div style={{ minHeight: "100vh", background: d.pageBg, display: "flex", alignItems: "center", justifyContent: "center", color: d.textMuted, fontFamily: "sans-serif" }}>
      Loading...
    </div>
  );

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: d.pageBg, fontFamily: "sans-serif", color: d.text, display: "flex", flexDirection: "column" }}>

      {/* NAV */}
      <div style={{ height: "56px", background: d.navBg, borderBottom: `1px solid ${d.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "30px", height: "30px", background: "#7c3aed", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "white", fontWeight: 700 }}>{"</>"}</div>
          <span style={{ fontWeight: 600, fontSize: "15px", color: d.text }}>Dev Collab</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/dashboard" style={{ fontSize: "13px", color: "#a78bfa", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
            ← Dashboard
          </Link>
          <button
            onClick={toggleTheme}
            style={{ background: d.cardBg, border: `1px solid ${d.border}`, borderRadius: "8px", padding: "5px 10px", cursor: "pointer", fontSize: "14px", color: d.text }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* BODY */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* LEFT — project info */}
        <div style={{ width: "280px", background: d.sidebarBg, borderRight: `1px solid ${d.border}`, padding: "1.5rem", overflowY: "auto", flexShrink: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Project header */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ width: "36px", height: "36px", background: "rgba(124,58,237,0.15)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🗂️</div>
              <div>
                <h2 style={{ fontSize: "15px", fontWeight: 600, color: d.text, margin: 0 }}>{project.title}</h2>
                <span style={{ fontSize: "11px", color: "#34d399" }}>● {project.status}</span>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: d.textMuted, lineHeight: "1.6" }}>{project.description}</p>
          </div>

          {/* Owner */}
          <div style={{ background: d.cardBg, border: `1px solid ${d.border}`, borderRadius: "10px", padding: "12px" }}>
            <div style={{ fontSize: "10px", color: d.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", fontWeight: 600 }}>Owner</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", background: "#7c3aed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700 }}>
                {project.owner?.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: d.text }}>{project.owner?.name}</div>
                <div style={{ fontSize: "11px", color: d.textMuted }}>{project.owner?.email}</div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <div>
              <div style={{ fontSize: "10px", color: d.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", fontWeight: 600 }}>Tech Stack</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.techStack.map((tech) => (
                  <span key={tech} style={{ fontSize: "11px", background: theme === "dark" ? "rgba(124,58,237,0.15)" : "#f3f0ff", color: "#a78bfa", border: `1px solid ${theme === "dark" ? "rgba(124,58,237,0.3)" : "#e9d5ff"}`, borderRadius: "6px", padding: "3px 10px" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Open Roles */}
          {project.openRoles?.length > 0 && (
            <div>
              <div style={{ fontSize: "10px", color: d.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", fontWeight: 600 }}>Open Roles</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {project.openRoles.map((role) => (
                  <div key={role} style={{ fontSize: "12px", background: theme === "dark" ? "rgba(5,150,105,0.1)" : "#ecfdf5", color: "#34d399", border: `1px solid ${theme === "dark" ? "rgba(5,150,105,0.25)" : "#a7f3d0"}`, borderRadius: "6px", padding: "5px 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>👤</span> {role}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Members */}
          {project.members?.length > 0 && (
            <div>
              <div style={{ fontSize: "10px", color: d.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", fontWeight: 600 }}>Members ({project.members.length})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {project.members.map((m) => (
                  <div key={m._id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "24px", height: "24px", background: "#7c3aed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "10px", fontWeight: 700 }}>
                      {m.name?.[0]?.toUpperCase()}
                    </div>
                    <span style={{ fontSize: "12px", color: d.textMuted }}>{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — chat */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.5rem", borderBottom: `1px solid ${d.border}`, background: d.navBg, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: d.text, margin: 0 }}>Project Chat</h3>
              <p style={{ fontSize: "12px", color: d.textMuted, margin: 0 }}>Real-time · Socket.io</p>
            </div>
          </div>
          <ChatBox projectId={projectId} theme={theme} d={d} />
        </div>
      </div>
    </div>
  );
};

const dark = {
  pageBg: "#0f0f1a",
  navBg: "#1a1a2e",
  sidebarBg: "#13131f",
  cardBg: "#1e1e30",
  border: "rgba(255,255,255,0.07)",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.45)",
};

const light = {
  pageBg: "#f3f4f6",
  navBg: "#ffffff",
  sidebarBg: "#ffffff",
  cardBg: "#f9fafb",
  border: "#e5e7eb",
  text: "#111827",
  textMuted: "#6b7280",
};

export default ChatPage;