import { useState, useEffect } from "react";
import ChannelModal from "../components/ChannelModal";
import ChannelCard from "../components/ChannelCard";
import { getAllChannels } from "../services/channelApi";

function Channel() {
  const [channels, setChannels] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const [editingChannel, setEditingChannel] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await getAllChannels();
      setChannels(response.data);
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  return (
    <div className="channel-page">
      <div className="channel-header">
        <h1>Channels</h1>

        <button
          onClick={() => {
            setEditingChannel(null);
            setIsEdit(false);
            setOpenModal(true);
          }}
        >
          + Create Channel
        </button>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search Channel" />
      </div>

      <div className="channel-list">
        {channels.length > 0 ? (
          channels.map((channel: any) => (
            <ChannelCard
              key={channel._id}
              channel={channel}
              fetchChannels={fetchChannels}
              onEdit={(channel) => {
                setEditingChannel(channel);
                setIsEdit(true);
                setOpenModal(true);
              }}
            />
          ))
        ) : (
          <p>No channels found.</p>
        )}
      </div>

      {openModal && (
        <ChannelModal
          workspaceId="6a59ab571683809afc858562"
          createdBy={JSON.parse(localStorage.getItem("user") || "{}")._id}
          fetchChannels={fetchChannels}
          onClose={() => {
            setOpenModal(false);
            setEditingChannel(null);
            setIsEdit(false);
          }}
          channel={editingChannel}
          isEdit={isEdit}
        />
      )}
    </div>
  );
}

export default Channel;