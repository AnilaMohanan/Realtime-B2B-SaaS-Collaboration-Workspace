import { Server, Socket } from "socket.io";
import Message from "../models/Message";

export const initializeSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User Connected:", socket.id);

    // Join Room
    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`${socket.id} joined room ${roomId}`);
    });

    // Send Message
    socket.on("sendMessage", async (...args) => {
      console.log("Args:", args);

      try {
        const data = args[0];

        const messageData =
          typeof data === "string" ? JSON.parse(data) : data;

        console.log("Received data:", messageData);
        console.log("Sender:", messageData.sender);
        console.log("Receiver:", messageData.receiver);
        console.log("Message:", messageData.message);

        const newMessage = new Message({
          sender: messageData.sender,
          receiver: messageData.receiver,
          message: messageData.message,
        });

        console.log("Before save:", newMessage);

        await newMessage.save();

        io.to(messageData.roomId).emit("receiveMessage", newMessage);

        console.log("Message saved:", newMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });
};