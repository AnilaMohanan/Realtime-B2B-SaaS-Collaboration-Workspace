import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  editMessage,
  deleteMessage,
} from "../services/messageApi";

interface Props {
  message: any;
  currentUser: any;
}

const MessageBubble = ({
  message,
  currentUser,
}: Props) => {

  const isMine =
    message.sender?._id === currentUser._id;

  const [editing, setEditing] =
    useState(false);

  const [text, setText] =
    useState(message.message);

  const update = async () => {

    try {

      await editMessage(
        message._id,
        {
          message: text,
        }
      );

      message.message = text;

      setEditing(false);

    } catch (err) {

      console.log(err);

    }

  };

  const remove = async () => {

    if (
      !window.confirm(
        "Delete this message?"
      )
    )
      return;

    try {

      await deleteMessage(
        message._id
      );

      window.location.reload();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div
      className={`flex mb-5 ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-md ${
          isMine
            ? "bg-blue-600 text-white"
            : "bg-white border"
        }`}
      >

        {!isMine && (

          <h4 className="font-semibold text-blue-600 mb-2">

            {message.sender?.name}

          </h4>

        )}

        {editing ? (

          <>
            <textarea
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              className="w-full border rounded-lg p-2 text-black"
            />

            <div className="flex gap-3 mt-3">

              <button
                onClick={update}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>

              <button
                onClick={() =>
                  setEditing(false)
                }
                className="bg-gray-400 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>

            </div>
          </>

        ) : (

          <p>

            {message.message}

          </p>

        )}

        <div
          className={`flex justify-between items-center mt-3 ${
            isMine
              ? "text-blue-100"
              : "text-gray-500"
          }`}
        >

          <small>

            {new Date(
              message.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}

          </small>

          {isMine && !editing && (

            <div className="flex gap-3">

              <FaEdit
                className="cursor-pointer hover:text-yellow-300"
                onClick={() =>
                  setEditing(true)
                }
              />

              <FaTrash
                className="cursor-pointer hover:text-red-300"
                onClick={remove}
              />

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default MessageBubble;