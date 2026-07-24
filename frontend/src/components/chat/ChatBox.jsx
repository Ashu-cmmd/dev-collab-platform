import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import useAuth from "../../hooks/useAuth.js";
import { getChatHistory } from "../../api/api.js";

let socket;

const ChatBox = ({ projectId, theme, d }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await getChatHistory(projectId);
        setMessages(data);
      } catch (err) {
        console.error("Failed to load chat history", err);
      }
    };
    loadHistory();

    socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
      auth: { token: user.token },
    });

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join_room", projectId);
    });

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
    });

    return () => {
      socket.emit("leave_room", projectId);
      socket.disconnect();
    };
  }, [projectId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("send_message", { projectId, content: input });
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) sendMessage();
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Status bar */}
      <div style={{ padding: "6px 1.5rem", background: connected ? (theme === "dark" ? "rgba(5,150,105,0.1)" : "#ecfdf5") : "rgba(239,68,68,0.1)", borderBottom: `1px solid ${d.border}`, display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: connected ? "#34d399" : "#f87171" }} />
        <span style={{ fontSize: "12px", color: connected ? "#34d399" : "#f87171" }}>
          {connected ? "Connected · Socket.io" : "Connecting..."}
        </span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: "8px" }}>
            <div style={{ fontSize: "32px" }}>💬</div>
            <p style={{ fontSize: "14px", color: d.textMuted, fontWeight: 500 }}>No messages yet</p>
            <p style={{ fontSize: "12px", color: d.textMuted }}>Be the first to say hello!</p>
          </div>
        )}

        {messages.map((msg) => {
          const isMe = msg.sender._id === user._id;
          return (
            <div key={msg._id} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start", gap: "3px" }}>
              {!isMe && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingLeft: "4px" }}>
                  <div style={{ width: "20px", height: "20px", background: "#7c3aed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "9px", fontWeight: 700 }}>
                    {msg.sender.name?.[0]?.toUpperCase()}
                  </div>
                  <span style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 600 }}>{msg.sender.name}</span>
                </div>
              )}
              <div style={{
                maxWidth: "65%",
                padding: "10px 14px",
                borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: isMe ? "#7c3aed" : d.cardBg,
                border: isMe ? "none" : `1px solid ${d.border}`,
                color: isMe ? "white" : d.text,
              }}>
                <p style={{ fontSize: "14px", lineHeight: "1.5", margin: 0 }}>{msg.content}</p>
                <p style={{ fontSize: "10px", color: isMe ? "rgba(255,255,255,0.6)" : d.textMuted, margin: "4px 0 0", textAlign: "right" }}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "1rem 1.5rem", borderTop: `1px solid ${d.border}`, background: d.navBg, display: "flex", gap: "10px", alignItems: "flex-end" }}>
        <input
          style={{ flex: 1, padding: "10px 14px", background: d.cardBg, border: `1px solid ${d.border}`, borderRadius: "12px", color: d.text, fontSize: "14px", outline: "none" }}
          type="text"
          placeholder="Type a message... (Enter to send)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "10px 20px", background: "#7c3aed", color: "white", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", flexShrink: 0 }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;