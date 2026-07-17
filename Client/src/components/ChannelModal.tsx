import { useState } from "react";
import { createChannel } from "../services/channelApi";

interface Props {
  workspaceId: string;
  createdBy: string;
  fetchChannels: () => void;
  onClose: () => void;
}

const ChannelModal = ({
  workspaceId,
  createdBy,
  fetchChannels,
  onClose,
}: Props) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createChannel({
        workspaceId,
        channelName,
        description,
        createdBy,
      });

      alert("Channel created successfully!");

      fetchChannels();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create channel");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white w-[500px] rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Create Channel
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Create
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ChannelModal;