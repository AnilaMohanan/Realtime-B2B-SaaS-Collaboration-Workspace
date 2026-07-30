import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

import socket from "../socket";

interface Props {
  channelId: string;
  sender: any;
}

const MessageInput = ({
  channelId,
  sender,
}: Props) => {

  const [message, setMessage] =
    useState("");

  const send = () => {

    if (!message.trim()) return;

    socket.emit("sendMessage", {

      sender: sender._id,

      channelId,

      message,

    });

    socket.emit(
      "stopTyping",
      channelId
    );

    setMessage("");

  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setMessage(e.target.value);

    socket.emit("typing", {

      channelId,

      userName: sender.name,

    });

  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if (e.key === "Enter") {

      send();

    }

  };

  return (

    <div className="flex gap-4 items-center">

      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 border rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={send}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 flex items-center gap-2 transition"
      >

        <FaPaperPlane />

        Send

      </button>

    </div>

  );

};

export default MessageInput;