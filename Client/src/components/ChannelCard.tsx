import { deleteChannel } from "../services/channelApi";
import { useNavigate } from "react-router-dom";

interface ChannelCardProps {
  channel: any;
  fetchChannels: () => void;
  onEdit: (channel: any) => void;
}

function ChannelCard({
  channel,
  fetchChannels,
  onEdit,
}: ChannelCardProps) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this channel?"
    );

    if (!confirmDelete) return;

    try {
      await deleteChannel(channel._id);
      alert("Channel deleted successfully!");
      fetchChannels();
    } catch (error) {
      console.error(error);
      alert("Failed to delete channel.");
    }
  };

  const handleOpen = () => {
    navigate(`/chat/${channel._id}`);
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {channel.channelName}
        </h2>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          Private
        </span>
      </div>

      <p className="text-gray-600 mt-3">
        {channel.description}
      </p>

      <div className="mt-4 text-sm text-gray-500">
        <p>
          <strong>Workspace:</strong>{" "}
          {channel.workspaceId?.name || "N/A"}
        </p>

        <p className="mt-1">
          <strong>Created By:</strong>{" "}
          {channel.createdBy?.name || "Unknown"}
        </p>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={handleOpen}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Open
        </button>

        <button
          onClick={() => onEdit(channel)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ChannelCard;