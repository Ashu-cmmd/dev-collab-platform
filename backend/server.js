import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import http from "http";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import initSocket from "./src/config/socket.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const httpServer = http.createServer(app);
  initSocket(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

setInterval(async () => {
  try {
    await mongoose.connection.db.admin().ping();
    console.log("MongoDB keep-alive ping sent");
  } catch (err) {
    console.error("Keep-alive ping failed:", err.message);
  }
}, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

startServer();