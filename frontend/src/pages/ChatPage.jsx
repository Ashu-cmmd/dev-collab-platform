import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProject } from "../api/api.js";
import ChatBox from "../components/chat/ChatBox.jsx";
import useAuth from "../hooks/useAuth.js";

const ChatPage = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchProject = async () => {
      try {
        const { data } = await getProject(projectId);
        setProject(data);
      } catch (err) {
        setError("Project not found");
      }
    };
    fetchProject();
  }, [projectId, user]);

  if (error) return <div style={styles.error}>{error}</div>;
  if (!project) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/dashboard" style={styles.back}>← Back to Dashboard</Link>
        <div>
          <h2 style={{ margin: 0 }}>{project.title}</h2>
          <p style={styles.meta}>By {project.owner?.name} · {project.status}</p>
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.info}>
          <h4>Description</h4>
          <p>{project.description}</p>
          {project.techStack?.length > 0 && (
            <>
              <h4>Tech Stack</h4>
              <div style={styles.tags}>
                {project.techStack.map((tech) => (
                  <span key={tech} style={styles.tag}>{tech}</span>
                ))}
              </div>
            </>
          )}
          {project.openRoles?.length > 0 && (
            <>
              <h4>Open Roles</h4>
              <div style={styles.tags}>
                {project.openRoles.map((role) => (
                  <span key={role} style={styles.tag}>{role}</span>
                ))}
              </div>
            </>
          )}
        </div>
        <div style={styles.chat}>
          <h4>Project Chat</h4>
          <ChatBox projectId={projectId} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: "100vh", background: "#13131f", color: "#fff", fontFamily: "sans-serif" },
  header: { padding: "1rem 2rem", background: "#1e1e2e", borderBottom: "1px solid #333" },
  back: { color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem" },
  meta: { color: "#888", margin: "0.25rem 0 0" },
  content: { display: "flex", gap: "2rem", padding: "2rem", maxWidth: "1100px", margin: "0 auto" },
  info: { width: "300px", flexShrink: 0 },
  chat: { flex: 1 },
  tags: { display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" },
  tag: { background: "#2a2a3d", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.85rem", color: "#a78bfa" },
  error: { color: "#f87171", padding: "2rem", textAlign: "center" },
  loading: { color: "#fff", padding: "2rem", textAlign: "center" },
};

export default ChatPage;