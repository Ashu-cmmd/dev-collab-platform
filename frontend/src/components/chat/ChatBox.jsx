import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import useAuth from "../../hooks/useAuth.js";
import { getChatHistory } from "../../api/api.js";

let socket;

const ChatBox = ({ projectId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Load chat history first
    const loadHistory = async () => {
      try {
        const { data } = await getChatHistory(projectId);
        setMessages(data);
      } catch (err) {
        console.error("Failed to load chat history", err);
      }
    };
    loadHistory();

    // Connect socket
    socket = io(import.meta.env.VITE_SOCKET_URL || "https://dev-collab-platform-bx9e.onrender.com", {
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

    // Cleanup on unmount
    return () => {
      socket.emit("leave_room", projectId);
      socket.disconnect();
    };
  }, [projectId]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("send_message", { projectId, content: input });
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={styles.container}>
      <div style={styles.status}>
        {connected ? "🟢 Connected" : "🔴 Connecting..."}
      </div>

      <div style={styles.messages}>
        {messages.length === 0 && (
          <p style={styles.empty}>No messages yet. Say hello!</p>
        )}
        {messages.map((msg) => {
          const isMe = msg.sender._id === user._id;
          return (
            <div
              key={msg._id}
              style={{
                ...styles.message,
                alignSelf: isMe ? "flex-end" : "flex-start",
                background: isMe ? "#7c3aed" : "#2a2a3d",
              }}
            >
              {!isMe && (
                <span style={styles.senderName}>{msg.sender.name}</span>
              )}
              <p style={styles.messageText}>{msg.content}</p>
              <span style={styles.time}>
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", height: "500px", background: "#1e1e2e", borderRadius: "8px", overflow: "hidden" },
  status: { padding: "0.5rem 1rem", fontSize: "0.8rem", background: "#13131f", borderBottom: "1px solid #333" },
  messages: { flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" },
  empty: { color: "#666", textAlign: "center", marginTop: "2rem" },
  message: { maxWidth: "70%", padding: "0.6rem 1rem", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "0.2rem" },
  senderName: { fontSize: "0.75rem", color: "#a78bfa", fontWeight: "bold" },
  messageText: { margin: 0, fontSize: "0.95rem", color: "#fff" },
  time: { fontSize: "0.7rem", color: "#888", alignSelf: "flex-end" },
  inputRow: { display: "flex", padding: "0.75rem", gap: "0.5rem", borderTop: "1px solid #333" },
  input: { flex: 1, padding: "0.6rem 1rem", borderRadius: "4px", border: "1px solid #444", background: "#2a2a3d", color: "#fff", fontSize: "0.95rem" },
  button: { padding: "0.6rem 1.2rem", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
};

export default ChatBox;