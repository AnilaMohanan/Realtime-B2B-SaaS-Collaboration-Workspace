import { useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-white flex flex-col">
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Workspace</h2>
        </div>

        <div className="flex-1 p-4 space-y-3">
          <div className="bg-blue-600 p-3 rounded-lg cursor-pointer">
            # General
          </div>

          <div className="hover:bg-gray-800 p-3 rounded-lg cursor-pointer">
            # Development
          </div>

          <div className="hover:bg-gray-800 p-3 rounded-lg cursor-pointer">
            # Random
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Channel Chat</h1>
            <p className="text-gray-500 text-sm">
              Channel ID: {id}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500"></div>
            <span className="font-semibold">
              Kalyani
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow w-fit">
            <strong>John</strong>
            <p>Hello 👋</p>
          </div>

          <div className="bg-blue-600 text-white p-4 rounded-lg shadow w-fit ml-auto">
            <strong>You</strong>
            <p>Hi!</p>
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t p-4 flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-3 outline-none"
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;