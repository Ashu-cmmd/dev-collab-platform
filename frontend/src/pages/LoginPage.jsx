import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { useTheme } from "../context/ThemeContext.jsx";

const features = [
  { icon: "🗂️", title: "Post projects", desc: "Share ideas and open roles with the community" },
  { icon: "💬", title: "Real-time chat", desc: "Socket.io powered rooms for every project" },
  { icon: "👥", title: "Find collaborators", desc: "Match with developers by tech stack" },
];

const LoginPage = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const d = theme === "dark" ? dark : light;

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
    <div style={{ width: "100%", minHeight: "100vh", background: d.pageBg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        style={{ position: "absolute", top: "1rem", right: "1rem", background: d.cardBg, border: `1px solid ${d.border}`, borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontSize: "16px", color: d.text }}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div style={{ display: "flex", width: "100%", maxWidth: "920px", minHeight: "560px", borderRadius: "16px", overflow: "hidden", border: `1px solid ${d.border}`, margin: "2rem", boxShadow: theme === "dark" ? "0 25px 50px rgba(0,0,0,0.5)" : "0 25px 50px rgba(0,0,0,0.1)" }}>

        {/* LEFT */}
        <div style={{ flex: "0 0 42%", background: "#7c3aed", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem" }}>
              <div style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "white", fontWeight: 700 }}>{"</>"}</div>
              <span style={{ color: "white", fontWeight: 600, fontSize: "16px" }}>Dev Collab</span>
            </div>
            <h1 style={{ color: "white", fontSize: "26px", fontWeight: 700, lineHeight: 1.3, marginBottom: "12px" }}>Build together.<br />Ship faster.</h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.6 }}>Find collaborators, post project ideas, and communicate in real time.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "2rem 0" }}>
            {features.map((f) => (
              <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.15)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "white", marginBottom: "2px" }}>{f.title}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Built with React · Node.js · MongoDB · Socket.io</p>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, background: d.cardBg, padding: "2.5rem", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "4px", background: d.inputBg, borderRadius: "8px", padding: "4px", marginBottom: "2rem" }}>
            <button style={{ flex: 1, padding: "8px", fontSize: "13px", background: "#7c3aed", border: "none", borderRadius: "6px", color: "white", cursor: "pointer", fontWeight: 500 }}>Sign in</button>
            <Link to="/register" style={{ flex: 1, textDecoration: "none" }}>
              <button style={{ width: "100%", padding: "8px", fontSize: "13px", background: "transparent", border: "none", borderRadius: "6px", color: d.textMuted, cursor: "pointer" }}>Register</button>
            </Link>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: d.text, marginBottom: "6px" }}>Welcome back</h2>
            <p style={{ fontSize: "13px", color: d.textMuted, marginBottom: "1.5rem" }}>Sign in to your account to continue</p>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", marginBottom: "1rem" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: d.textMuted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Email</label>
                <input style={{ width: "100%", padding: "10px 12px", background: d.inputBg, border: `1px solid ${d.border}`, borderRadius: "8px", color: d.text, fontSize: "14px", outline: "none" }}
                  type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: d.textMuted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Password</label>
                <input style={{ width: "100%", padding: "10px 12px", background: d.inputBg, border: `1px solid ${d.border}`, borderRadius: "8px", color: d.text, fontSize: "14px", outline: "none" }}
                  type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" disabled={loading}
                style={{ width: "100%", padding: "11px", background: "#7c3aed", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginTop: "0.5rem" }}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p style={{ fontSize: "13px", color: d.textMuted, textAlign: "center", marginTop: "1.5rem" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 500 }}>Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const dark = {
  pageBg: "#0f0f1a",
  cardBg: "#1a1a2e",
  inputBg: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.08)",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.5)",
};

const light = {
  pageBg: "#f3f4f6",
  cardBg: "#ffffff",
  inputBg: "#f9fafb",
  border: "#e5e7eb",
  text: "#111827",
  textMuted: "#6b7280",
};

export default LoginPage;