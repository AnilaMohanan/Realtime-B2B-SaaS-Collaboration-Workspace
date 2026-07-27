import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import StatsCard from "../components/StatsCard";
import ChannelCard from "../components/ChannelCard";
import ChannelModal from "../components/ChannelModal";

import {
  FaComments,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";

import {
  getAllChannels,
} from "../services/channelApi";

import {
  getAllWorkspaces,
} from "../services/workspaceApi";

const Channel = () => {

  const [channels, setChannels] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    totalChannels: 0,
    totalWorkspaces: 0,
    totalMembers: 0,
  });

  const filteredChannels = channels.filter((channel) =>
    channel.channelName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const fetchChannels = async () => {
    try {

      setLoading(true);

      const res = await getAllChannels();

      setChannels(res.data.data);

      setStats((prev) => ({
        ...prev,
        totalChannels: res.data.total,
      }));

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const fetchWorkspaces = async () => {

    try {

      const res = await getAllWorkspaces();

      setStats((prev) => ({
        ...prev,
        totalWorkspaces: res.data.total,
      }));

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchChannels();

    fetchWorkspaces();

  }, []);

  return (

    <DashboardLayout
      search={search}
      setSearch={setSearch}
      title="Channels"
      placeholder="Search channels..."
    >

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">

            Channel Dashboard

          </h1>

          <p className="text-gray-500 mt-2">

            Manage all channels inside your workspaces.

          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >

          + Create Channel

        </button>

      </div>

      {/* Modal */}

      {open && (

        <ChannelModal
          fetchChannels={fetchChannels}
          onClose={() => setOpen(false)}
        />

      )}

      {/* Statistics */}

      <div className="grid grid-cols-3 gap-6 mt-10">

        <StatsCard
          title="Total Channels"
          value={stats.totalChannels}
          icon={<FaComments />}
          color="bg-blue-500"
        />

        <StatsCard
          title="Workspaces"
          value={stats.totalWorkspaces}
          icon={<FaBuilding />}
          color="bg-green-500"
        />

        <StatsCard
          title="Members"
          value={stats.totalMembers}
          icon={<FaUsers />}
          color="bg-purple-500"
        />

      </div>

      {/* Channel List */}

      <h2 className="text-2xl font-bold mt-12 mb-6">

        Channels

      </h2>

      {loading ? (

        <div className="text-center text-xl mt-10">

          Loading...

        </div>

      ) : filteredChannels.length === 0 ? (

        <div className="text-center text-gray-500 text-lg mt-12">

          No Channels Found

        </div>

      ) : (

        <div className="grid grid-cols-3 gap-6">

          {filteredChannels.map((channel) => (

            <ChannelCard
              key={channel._id}
              channel={channel}
              fetchChannels={fetchChannels}
            />

          ))}

        </div>

      )}

    </DashboardLayout>

  );

};

export default Channel;