import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const features = [
  {
    icon: "🗂️",
    title: "Post projects",
    desc: "Share ideas and open roles with the community",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.1)",
  },
  {
    icon: "💬",
    title: "Real-time chat",
    desc: "Socket.io powered rooms for every project",
    color: "#059669",
    bg: "rgba(5,150,105,0.1)",
  },
  {
    icon: "👥",
    title: "Find collaborators",
    desc: "Match with developers by tech stack",
    color: "#d97706",
    bg: "rgba(217,119,6,0.1)",
  },
];

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* LEFT — feature sidebar */}
        <div style={styles.left}>
          <div>
            <div style={styles.logoRow}>
              <div style={styles.logoBox}>
                <span style={{ color: "white", fontSize: "20px" }}>{"</>"}</span>
              </div>
              <span style={styles.logoText}>Dev Collab</span>
            </div>
            <h1 style={styles.heading}>Build together.<br />Ship faster.</h1>
            <p style={styles.subheading}>
              Find collaborators, post project ideas, and communicate in real time.
            </p>
          </div>

          <div style={styles.features}>
            {features.map((f) => (
              <div key={f.title} style={styles.feat}>
                <div style={{ ...styles.featIcon, background: f.bg }}>
                  <span style={{ fontSize: "18px" }}>{f.icon}</span>
                </div>
                <div>
                  <div style={{ ...styles.featTitle, color: f.color }}>{f.title}</div>
                  <div style={styles.featDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.leftFooter}>
            Built with React · Node.js · MongoDB · Socket.io
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div style={styles.right}>

          {/* tabs */}
          <div style={styles.tabs}>
            <button
              style={{ ...styles.tab, ...(activeTab === "login" ? styles.tabActive : {}) }}
              onClick={() => setActiveTab("login")}
            >
              Sign in
            </button>
            <Link to="/register" style={{ textDecoration: "none", flex: 1 }}>
              <button
                style={{ ...styles.tab, width: "100%", ...(activeTab === "register" ? styles.tabActive : {}) }}
              >
                Register
              </button>
            </Link>
          </div>

          <div style={styles.formWrap}>
            <h2 style={styles.formTitle}>Welcome back</h2>
            <p style={styles.formSub}>Sign in to your account to continue</p>

            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  style={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input
                  style={styles.input}
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button style={styles.btn} type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p style={styles.switchText}>
              Don't have an account?{" "}
              <Link to="/register" style={styles.switchLink}>Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f0f1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    fontFamily: "sans-serif",
  },
  container: {
    display: "flex",
    width: "100%",
    maxWidth: "900px",
    minHeight: "580px",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  left: {
    flex: "0 0 42%",
    background: "#7c3aed",
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "2rem",
  },
  logoBox: {
    width: "36px",
    height: "36px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
  },
  heading: {
    color: "white",
    fontSize: "26px",
    fontWeight: "700",
    lineHeight: "1.3",
    marginBottom: "12px",
  },
  subheading: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    margin: "2rem 0",
  },
  feat: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  featIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "white",
    marginBottom: "2px",
  },
  featDesc: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)",
    lineHeight: "1.4",
  },
  leftFooter: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.4)",
  },
  right: {
    flex: 1,
    background: "#1a1a2e",
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
  },
  tabs: {
    display: "flex",
    gap: "4px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "8px",
    padding: "4px",
    marginBottom: "2rem",
  },
  tab: {
    flex: 1,
    padding: "8px",
    fontSize: "13px",
    background: "transparent",
    border: "none",
    borderRadius: "6px",
    color: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    fontWeight: "500",
  },
  tabActive: {
    background: "#7c3aed",
    color: "white",
  },
  formWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formTitle: {
    color: "white",
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "6px",
  },
  formSub: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "13px",
    marginBottom: "1.5rem",
  },
  error: {
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.3)",
    color: "#f87171",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "1rem",
  },
  field: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "500",
    color: "rgba(255,255,255,0.6)",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  },
  btn: {
    width: "100%",
    padding: "11px",
    background: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  switchText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "13px",
    textAlign: "center",
    marginTop: "1.5rem",
  },
  switchLink: {
    color: "#a78bfa",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default LoginPage;