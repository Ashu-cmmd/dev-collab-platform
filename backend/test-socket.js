import { io } from "socket.io-client";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhM2FkYTYzYjJhYjM2YWE1NTIxMjQ3MyIsImlhdCI6MTc4MjI4NDkzMSwiZXhwIjoxNzg0ODc2OTMxfQ.YW8rOGVvVw8P73PfVm0C-Xdc3ejf1uUE2gofQZ0r_14";
const projectId = "6a3d38d56782994ccc76efdf";

const socket = io("http://localhost:5000", {
  auth: { token }
});

socket.on("connect", () => {
  console.log("Connected to socket server!");

  socket.emit("join_room", projectId);

  socket.emit("send_message", {
    projectId,
    content: "Hello from socket test!"
  });
});

socket.on("receive_message", (message) => {
  console.log("Message received:", message);
});

socket.on("connect_error", (err) => {
  console.log("Connection error:", err.message);
});