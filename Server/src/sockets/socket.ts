import { Server, Socket } from "socket.io";
import http from "http";
import Message from "../models/Message";

const onlineUsers = new Map<string, string>();

export const initializeSocket = (
  server: http.Server
) => {

  const io = new Server(server, {

    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },

  });

  io.on("connection", (socket: Socket) => {

    console.log("User Connected:", socket.id);

    /**
     * User comes online
     */
    socket.on("join", (userId: string) => {

      onlineUsers.set(userId, socket.id);

      io.emit(
        "onlineUsers",
        Array.from(onlineUsers.keys())
      );

      console.log(userId, "joined");

    });

    /**
     * Join Workspace
     */

    socket.on(
      "joinWorkspace",
      (workspaceId: string) => {

        socket.join(workspaceId);

        console.log(
          "Joined Workspace:",
          workspaceId
        );

      }
    );

    /**
     * Join Channel
     */

    socket.on(
      "joinChannel",
      (channelId: string) => {

        socket.join(channelId);

        console.log(
          "Joined Channel:",
          channelId
        );

      }
    );
socket.on(
  "sendMessage",
  async (data) => {

    try {

      const message =
        await Message.create({

          sender: data.sender,

          channelId: data.channelId,

          message: data.message,

        });

      const populated =
        await Message.findById(message._id)
          .populate(
            "sender",
            "name email"
          );

      io.to(data.channelId).emit(
        "receiveMessage",
        populated
      );

    } catch (err) {

      console.log(err);

    }

  }
);

socket.on(
  "typing",
  ({ channelId, userName }) => {

    socket.to(channelId).emit(
      "userTyping",
      {
        userName,
      }
    );

  }
);
socket.on(
  "stopTyping",
  (channelId) => {

    socket.to(channelId).emit(
      "userStoppedTyping"
    );

  }
);
    /**
     * Disconnect
     */

    socket.on("disconnect", () => {

      console.log(
        "User Disconnected:",
        socket.id
      );

      for (const [userId, id] of onlineUsers) {

        if (id === socket.id) {

          onlineUsers.delete(userId);

          break;

        }

      }

      io.emit(
        "onlineUsers",
        Array.from(onlineUsers.keys())
      );

    });

  });

  return io;

};