import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";

import socket from "../socket";

import {
  getMessages,
} from "../services/messageApi";

const Chat = () => {

  const { channelId } = useParams();

  const [search, setSearch] = useState("");

  const [messages, setMessages] =
    useState<any[]>([]);

  const [typing, setTyping] =
    useState("");

  const [onlineUsers, setOnlineUsers] =
    useState<string[]>([]);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const fetchMessages =
    async () => {

      try {

        const res =
          await getMessages(
            channelId!
          );

        setMessages(
          res.data.messages
        );

      } catch (err) {

        console.log(err);

      }

    };

  useEffect(() => {

    fetchMessages();

  }, [channelId]);

  useEffect(() => {

    socket.emit(
      "join",
      user._id
    );

    socket.emit(
      "joinChannel",
      channelId
    );

  }, [channelId]);

  useEffect(() => {

    socket.on(
      "receiveMessage",
      (message) => {

        setMessages(
          (prev) => [
            ...prev,
            message,
          ]
        );

      }
    );

    return () => {

      socket.off(
        "receiveMessage"
      );

    };

  }, []);

  useEffect(() => {

    socket.on(
      "onlineUsers",
      (users) => {

        setOnlineUsers(
          users
        );

      }
    );

    return () => {

      socket.off(
        "onlineUsers"
      );

    };

  }, []);

  useEffect(() => {

    socket.on(
      "userTyping",
      (data) => {

        setTyping(
          `${data.userName} is typing...`
        );

      }
    );

    socket.on(
      "userStoppedTyping",
      () => {

        setTyping("");

      }
    );

    return () => {

      socket.off(
        "userTyping"
      );

      socket.off(
        "userStoppedTyping"
      );

    };

  }, []);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({

      behavior: "smooth",

    });

  }, [messages]);

  return (

    <DashboardLayout
      search={search}
      setSearch={setSearch}
    >
              <div className="bg-white rounded-2xl shadow-lg h-[82vh] flex flex-col overflow-hidden">

        {/* Header */}

        <div className="border-b px-8 py-5 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">

              Team Chat

            </h2>

            <p className="text-gray-500">

              Real-Time Workspace Conversation

            </p>

          </div>

          <div className="flex items-center gap-3">

            <span className="w-3 h-3 rounded-full bg-green-500"></span>

            <p>

              {onlineUsers.length} Online

            </p>

          </div>

        </div>
                {/* Messages */}

        <div className="flex-1 overflow-y-auto bg-gray-100 px-8 py-6">

          {messages.length === 0 ? (

            <div className="h-full flex flex-col justify-center items-center">

              <div className="text-7xl mb-6">

                💬

              </div>

              <h2 className="text-3xl font-bold">

                No Messages Yet

              </h2>

              <p className="text-gray-500 mt-3">

                Start the conversation with your team.

              </p>

            </div>

          ) : (

            messages.map((message: any) => (

              <MessageBubble
                key={message._id}
                message={message}
                currentUser={user}
              />

            ))

          )}

          {/* Typing Indicator */}

          {typing && (

            <div className="mt-3">

              <p className="text-sm italic text-gray-500 animate-pulse">

                {typing}

              </p>

            </div>

          )}

          {/* Auto Scroll */}

          <div ref={messagesEndRef}></div>

        </div>

        {/* Footer */}

        <div className="border-t bg-white p-5">

          <MessageInput
            channelId={channelId!}
            sender={user}
          />

        </div>

      </div>

    </DashboardLayout>

  );

};

export default Chat;
