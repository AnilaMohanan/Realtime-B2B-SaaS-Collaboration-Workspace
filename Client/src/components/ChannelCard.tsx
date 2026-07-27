import { useState } from "react";

import {
  FaEdit,
  FaTrash,
  FaComments,
  FaUser,
  FaBuilding,
} from "react-icons/fa";

import { deleteChannel } from "../services/channelApi";

import ChannelModal from "./ChannelModal";

interface Props {
  channel: any;
  fetchChannels: () => void;
}

const ChannelCard = ({
  channel,
  fetchChannels,
}: Props) => {

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this channel?"
    );

    if (!confirmDelete) return;

    try {

      await deleteChannel(channel._id);

      alert("Channel deleted successfully");

      fetchChannels();

    } catch (err) {

      console.log(err);

      alert("Failed to delete channel");

    }

  };

  return (

    <>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <div className="bg-blue-100 p-3 rounded-full">

              <FaComments
                size={22}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold">

                {channel.channelName}

              </h2>

              <p className="text-sm text-gray-500">

                Channel

              </p>

            </div>

          </div>

          <div className="flex gap-2">

            <button
              onClick={() => setOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg"
            >

              <FaEdit />

            </button>

            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
            >

              <FaTrash />

            </button>

          </div>

        </div>

        {/* Description */}

        <div className="mt-5">

          <p className="text-gray-700">

            {channel.description || "No Description"}

          </p>

        </div>

        {/* Workspace */}

        <div className="flex items-center gap-2 mt-6">

          <FaBuilding className="text-blue-600" />

          <span className="font-medium">

            Workspace :

          </span>

          <span>

            {channel.workspaceId?.workspaceName}

          </span>

        </div>

        {/* Created By */}

        <div className="flex items-center gap-2 mt-3">

          <FaUser className="text-green-600" />

          <span className="font-medium">

            Created By :

          </span>

          <span>

            {channel.createdBy?.name}

          </span>

        </div>

        {/* Footer */}

        <div className="mt-6 pt-4 border-t flex justify-between text-sm text-gray-500">

          <span>

            Created :

            {" "}

            {new Date(
              channel.createdAt
            ).toLocaleDateString()}

          </span>

          <span>

            Updated :

            {" "}

            {new Date(
              channel.updatedAt
            ).toLocaleDateString()}

          </span>

        </div>

      </div>

      {open && (

        <ChannelModal
          channel={channel}
          fetchChannels={fetchChannels}
          onClose={() => setOpen(false)}
        />

      )}

    </>

  );

};

export default ChannelCard;