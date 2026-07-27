import { useState, useEffect } from "react";
import {
  createChannel,
  updateChannel,
} from "../services/channelApi";

interface Props {
  workspaceId: string;
  createdBy: string;
  fetchChannels: () => void;
  onClose: () => void;
  channel?: any;
  isEdit?: boolean;
}

const ChannelModal = ({
  workspaceId,
  createdBy,
  fetchChannels,
  onClose,
  channel,
  isEdit = false,
}: Props) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isEdit && channel) {
      setChannelName(channel.channelName || "");
      setDescription(channel.description || "");
    } else {
      setChannelName("");
      setDescription("");
    }
  }, [channel, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && channel) {
        await updateChannel(channel._id, {
          workspaceId,
          channelName,
          description,
          createdBy,
        });

        alert("Channel updated successfully!");
      } else {
        await createChannel({
          workspaceId,
          channelName,
          description,
          createdBy,
        });

        alert("Channel created successfully!");
      }

      fetchChannels();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-8 w-[500px] shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEdit ? "Edit Channel" : "Create Channel"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border w-full p-3 rounded mb-4"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
          />

          <textarea
            className="border w-full p-3 rounded mb-6"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChannelModal;