import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const features = [
  {
    icon: "🗂️",
    title: "Post Project Ideas",
    desc: "Share your project ideas with the developer community. Add tech stack, open roles, and a description to attract the right collaborators.",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.1)",
    border: "rgba(124,58,237,0.2)",
  },
  {
    icon: "💬",
    title: "Real-time Chat",
    desc: "Every project has its own dedicated chat room powered by Socket.io. Messages are delivered instantly and persisted in MongoDB.",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.1)",
    border: "rgba(14,165,233,0.2)",
  },
  {
    icon: "👥",
    title: "Find Collaborators",
    desc: "Browse projects by tech stack and open roles. Find teammates who match your skills and start building together.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.2)",
  },
];

const steps = [
  { step: "01", title: "Create an account", desc: "Register in seconds with your name and email. No credit card required." },
  { step: "02", title: "Post your project", desc: "Add a title, description, tech stack, and the roles you're looking to fill." },
  { step: "03", title: "Start collaborating", desc: "Connect with developers, join project chats, and build something great together." },
];

const techStack = [
  { name: "React", color: "#61dafb" },
  { name: "Node.js", color: "#68a063" },
  { name: "MongoDB", color: "#47a248" },
  { name: "Socket.io", color: "#a78bfa" },
  { name: "Express", color: "#f59e0b" },
  { name: "JWT", color: "#f87171" },
  { name: "Vercel", color: "#ffffff" },
  { name: "Render", color: "#34d399" },
];

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const d = theme === "dark" ? dark : light;

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: d.pageBg, color: d.text, fontFamily: "sans-serif" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: d.navBg, borderBottom: `1px solid ${d.border}`, padding: "0 2rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", background: "#7c3aed", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px", fontWeight: 700 }}>{"</>"}</div>
          <span style={{ fontWeight: 700, fontSize: "16px", color: d.text }}>Dev Collab</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={toggleTheme}
            style={{ background: d.cardBg, border: `1px solid ${d.border}`, borderRadius: "8px", padding: "6px 10px", cursor: "pointer", fontSize: "14px" }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <Link to="/login" style={{ fontSize: "14px", color: d.textMuted, textDecoration: "none", padding: "7px 14px", borderRadius: "8px", border: `1px solid ${d.border}` }}>
            Sign in
          </Link>
          <Link to="/register" style={{ fontSize: "14px", color: "white", textDecoration: "none", padding: "7px 14px", borderRadius: "8px", background: "#7c3aed", fontWeight: 500 }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "6rem 2rem 4rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: theme === "dark" ? "rgba(124,58,237,0.15)" : "#f3f0ff", border: `1px solid ${theme === "dark" ? "rgba(124,58,237,0.3)" : "#e9d5ff"}`, borderRadius: "999px", padding: "5px 14px", fontSize: "13px", color: "#a78bfa", marginBottom: "2rem" }}>
          <span>⚡</span> Real-time collaboration for developers
        </div>

        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, color: d.heading, marginBottom: "1.5rem", letterSpacing: "-1px" }}>
          Find your next<br />
          <span style={{ color: "#7c3aed" }}>dev collaborator</span>
        </h1>

        <p style={{ fontSize: "18px", color: d.textMuted, lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 2.5rem" }}>
          Post project ideas, find teammates with the right skills, and communicate in real time. Built for developers, by a developer.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/register" style={{ padding: "13px 28px", background: "#7c3aed", color: "white", borderRadius: "10px", textDecoration: "none", fontSize: "15px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Start for free →
          </Link>
          <Link to="/login" style={{ padding: "13px 28px", background: d.cardBg, color: d.text, borderRadius: "10px", textDecoration: "none", fontSize: "15px", border: `1px solid ${d.border}`, display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Sign in
          </Link>
        </div>

        <p style={{ fontSize: "12px", color: d.textMuted, marginTop: "1rem" }}>
          Free to use · No credit card required
        </p>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ background: d.cardBg, border: `1px solid ${d.border}`, borderRadius: "16px", overflow: "hidden", boxShadow: theme === "dark" ? "0 25px 60px rgba(0,0,0,0.5)" : "0 25px 60px rgba(0,0,0,0.1)" }}>

          {/* Fake browser bar */}
          <div style={{ background: theme === "dark" ? "#0d0d18" : "#f3f4f6", padding: "10px 16px", display: "flex", alignItems: "center", gap: "6px", borderBottom: `1px solid ${d.border}` }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f87171" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fbbf24" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#34d399" }} />
            <div style={{ flex: 1, background: d.cardBg, borderRadius: "5px", padding: "3px 10px", fontSize: "11px", color: d.textMuted, maxWidth: "300px", margin: "0 auto" }}>
              dev-collab-platform-flax.vercel.app
            </div>
          </div>

          {/* Fake dashboard UI */}
          <div style={{ display: "flex", height: "320px" }}>
            <div style={{ width: "160px", background: theme === "dark" ? "#13131f" : "#f9fafb", borderRight: `1px solid ${d.border}`, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {["⊞  Dashboard", "💬  Chats", "👤  Profile"].map((item, i) => (
                <div key={i} style={{ padding: "7px 10px", borderRadius: "7px", fontSize: "12px", background: i === 0 ? "rgba(124,58,237,0.2)" : "transparent", color: i === 0 ? "#a78bfa" : d.textMuted }}>{item}</div>
              ))}
              <div style={{ marginTop: "auto", background: "rgba(124,58,237,0.1)", borderRadius: "8px", padding: "10px", border: "1px solid rgba(124,58,237,0.2)" }}>
                <div style={{ fontSize: "10px", color: d.textMuted, marginBottom: "3px" }}>Projects</div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#a78bfa" }}>3</div>
              </div>
            </div>

            <div style={{ flex: 1, padding: "16px", overflowY: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "12px" }}>
                {[["3", "Total projects"], ["7", "Open roles"], ["2", "Active chats"]].map(([val, label]) => (
                  <div key={label} style={{ background: d.pageBg, border: `1px solid ${d.border}`, borderRadius: "8px", padding: "10px" }}>
                    <div style={{ fontSize: "10px", color: d.textMuted }}>{label}</div>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: d.text }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[
                  { title: "Dev Collab Platform", tags: ["React", "Node.js"], role: "Frontend Dev" },
                  { title: "AI Code Reviewer", tags: ["Python", "FastAPI"], role: "ML Engineer" },
                ].map((p) => (
                  <div key={p.title} style={{ background: d.pageBg, border: `1px solid ${d.border}`, borderLeft: "3px solid #7c3aed", borderRadius: "8px", padding: "10px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: d.text, marginBottom: "4px" }}>{p.title}</div>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "4px" }}>
                      {p.tags.map(t => <span key={t} style={{ fontSize: "9px", background: "rgba(124,58,237,0.15)", color: "#a78bfa", borderRadius: "4px", padding: "1px 6px" }}>{t}</span>)}
                    </div>
                    <div style={{ fontSize: "9px", background: "rgba(5,150,105,0.1)", color: "#34d399", borderRadius: "4px", padding: "1px 6px", display: "inline-block" }}>👤 {p.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: d.heading, marginBottom: "12px" }}>Everything you need to collaborate</h2>
          <p style={{ fontSize: "16px", color: d.textMuted, maxWidth: "480px", margin: "0 auto" }}>Built with modern tools and real-world architecture patterns.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: d.cardBg, border: `1px solid ${d.border}`, borderRadius: "14px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ width: "44px", height: "44px", background: f.bg, border: `1px solid ${f.border}`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: d.text, margin: 0 }}>{f.title}</h3>
              <p style={{ fontSize: "14px", color: d.textMuted, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: theme === "dark" ? "#13131f" : "#f3f4f6", padding: "5rem 2rem", borderTop: `1px solid ${d.border}`, borderBottom: `1px solid ${d.border}` }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: d.heading, marginBottom: "12px" }}>How it works</h2>
            <p style={{ fontSize: "16px", color: d.textMuted }}>Get started in 3 simple steps.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {steps.map((step, i) => (
              <div key={step.step} style={{ textAlign: "center", position: "relative" }}>
                <div style={{ width: "52px", height: "52px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "18px", fontWeight: 700, color: "#a78bfa" }}>
                  {step.step}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ position: "absolute", top: "26px", left: "calc(50% + 26px)", width: "calc(100% - 52px)", height: "1px", background: "rgba(124,58,237,0.2)", display: window.innerWidth > 640 ? "block" : "none" }} />
                )}
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: d.text, marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "13px", color: d.textMuted, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: d.heading, marginBottom: "8px" }}>Built with modern tech</h2>
        <p style={{ fontSize: "15px", color: d.textMuted, marginBottom: "2.5rem" }}>Production-ready stack from database to deployment.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
          {techStack.map((t) => (
            <span key={t.name} style={{ padding: "8px 18px", background: d.cardBg, border: `1px solid ${d.border}`, borderRadius: "999px", fontSize: "14px", fontWeight: 500, color: t.name === "Vercel" && theme === "dark" ? "#ffffff" : t.color === "#ffffff" ? d.text : t.color }}>
              {t.name}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#7c3aed", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: 800, color: "white", marginBottom: "12px", letterSpacing: "-0.5px" }}>
          Ready to build something?
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", marginBottom: "2rem", maxWidth: "420px", margin: "0 auto 2rem" }}>
          Join developers who are already collaborating on Dev Collab Platform.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/register" style={{ padding: "13px 28px", background: "white", color: "#7c3aed", borderRadius: "10px", textDecoration: "none", fontSize: "15px", fontWeight: 700 }}>
            Get started for free
          </Link>
          <Link to="/login" style={{ padding: "13px 28px", background: "rgba(255,255,255,0.15)", color: "white", borderRadius: "10px", textDecoration: "none", fontSize: "15px", border: "1px solid rgba(255,255,255,0.3)" }}>
            Sign in
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: d.navBg, borderTop: `1px solid ${d.border}`, padding: "2rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
          <div style={{ width: "24px", height: "24px", background: "#7c3aed", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700 }}>{"</>"}</div>
          <span style={{ fontWeight: 600, fontSize: "14px", color: d.text }}>Dev Collab Platform</span>
        </div>
        <p style={{ fontSize: "13px", color: d.textMuted }}>
          Built by Abhi · React + Node.js + MongoDB + Socket.io
        </p>
        <p style={{ fontSize: "12px", color: d.textMuted, marginTop: "6px" }}>
          <a href="https://github.com/Ashu-cmmd/dev-collab-platform" target="_blank" rel="noreferrer" style={{ color: "#a78bfa", textDecoration: "none" }}>GitHub</a>
          {" · "}
          <Link to="/login" style={{ color: "#a78bfa", textDecoration: "none" }}>Sign in</Link>
          {" · "}
          <Link to="/register" style={{ color: "#a78bfa", textDecoration: "none" }}>Register</Link>
        </p>
      </footer>

    </div>
  );
};

const dark = {
  pageBg: "#0f0f1a",
  navBg: "rgba(15,15,26,0.85)",
  cardBg: "#1a1a2e",
  border: "rgba(255,255,255,0.07)",
  text: "#ffffff",
  heading: "#ffffff",
  textMuted: "rgba(255,255,255,0.5)",
};

const light = {
  pageBg: "#ffffff",
  navBg: "rgba(255,255,255,0.85)",
  cardBg: "#f9fafb",
  border: "#e5e7eb",
  text: "#111827",
  heading: "#111827",
  textMuted: "#6b7280",
};

export default LandingPage;