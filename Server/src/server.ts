import dotenv from "dotenv";
dotenv.config();

import http from "http";

import app from "./app";
import connectDB from "./config/database";
import { initializeSocket } from "./sockets/socket";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    initializeSocket(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
};

startServer();