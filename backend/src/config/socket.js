import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Message from "../models/Message.js";

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Auth middleware for socket connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("Authentication error: no token"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new Error("Authentication error: user not found"));
      }

      socket.user = user; // attach user to socket
      next();
    } catch (error) {
      next(new Error("Authentication error: invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.name}`);

    // Join a project room
    socket.on("join_room", (projectId) => {
      socket.join(projectId);
      console.log(`${socket.user.name} joined room: ${projectId}`);
    });

    // Leave a project room
    socket.on("leave_room", (projectId) => {
      socket.leave(projectId);
      console.log(`${socket.user.name} left room: ${projectId}`);
    });

    // Send a message
    socket.on("send_message", async (data) => {
      try {
        const { projectId, content } = data;

        const message = await Message.create({
          projectId,
          sender: socket.user._id,
          content,
        });

        const populated = await message.populate("sender", "name email");

        // Broadcast to everyone in the room including sender
        io.to(projectId).emit("receive_message", populated);
      } catch (error) {
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.name}`);
    });
  });

  return io;
};

export default initSocket;