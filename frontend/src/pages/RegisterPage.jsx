import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { useTheme } from "../context/ThemeContext.jsx";

const RegisterPage = () => {
  const { register } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: d.pageBg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>

      <button
        onClick={toggleTheme}
        style={{ position: "absolute", top: "1rem", right: "1rem", background: d.cardBg, border: `1px solid ${d.border}`, borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontSize: "16px", color: d.text }}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div style={{ display: "flex", width: "100%", maxWidth: "920px", minHeight: "600px", borderRadius: "16px", overflow: "hidden", border: `1px solid ${d.border}`, margin: "2rem", boxShadow: theme === "dark" ? "0 25px 50px rgba(0,0,0,0.5)" : "0 25px 50px rgba(0,0,0,0.1)" }}>

        {/* LEFT */}
        <div style={{ flex: "0 0 42%", background: "#7c3aed", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem" }}>
              <div style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "white", fontWeight: 700 }}>{"</>"}</div>
              <span style={{ color: "white", fontWeight: 600, fontSize: "16px" }}>Dev Collab</span>
            </div>
            <h1 style={{ color: "white", fontSize: "24px", fontWeight: 700, lineHeight: 1.3, marginBottom: "12px" }}>Join the community.<br />Start building.</h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.6 }}>Create an account and start collaborating with developers worldwide.</p>
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Built with React · Node.js · MongoDB · Socket.io</p>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, background: d.cardBg, padding: "2.5rem", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "4px", background: d.inputBg, borderRadius: "8px", padding: "4px", marginBottom: "2rem" }}>
            <Link to="/login" style={{ flex: 1, textDecoration: "none" }}>
              <button style={{ width: "100%", padding: "8px", fontSize: "13px", background: "transparent", border: "none", borderRadius: "6px", color: d.textMuted, cursor: "pointer" }}>Sign in</button>
            </Link>
            <button style={{ flex: 1, padding: "8px", fontSize: "13px", background: "#7c3aed", border: "none", borderRadius: "6px", color: "white", cursor: "pointer", fontWeight: 500 }}>Register</button>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: d.text, marginBottom: "6px" }}>Create your account</h2>
            <p style={{ fontSize: "13px", color: d.textMuted, marginBottom: "1.5rem" }}>Join developers building together</p>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", padding: "10px 12px", borderRadius: "8px", fontSize: "13px", marginBottom: "1rem" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {[
                { label: "Name", type: "text", placeholder: "Your full name", value: name, onChange: setName },
                { label: "Email", type: "email", placeholder: "you@example.com", value: email, onChange: setEmail },
                { label: "Password", type: "password", placeholder: "At least 6 characters", value: password, onChange: setPassword },
              ].map(({ label, type, placeholder, value, onChange }) => (
                <div key={label} style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: d.textMuted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
                  <input
                    style={{ width: "100%", padding: "10px 12px", background: d.inputBg, border: `1px solid ${d.border}`, borderRadius: "8px", color: d.text, fontSize: "14px", outline: "none" }}
                    type={type} placeholder={placeholder} value={value}
                    onChange={(e) => onChange(e.target.value)} required
                  />
                </div>
              ))}
              <button type="submit" disabled={loading}
                style={{ width: "100%", padding: "11px", background: "#7c3aed", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginTop: "0.5rem" }}>
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p style={{ fontSize: "13px", color: d.textMuted, textAlign: "center", marginTop: "1.5rem" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 500 }}>Sign in</Link>
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

export default RegisterPage;