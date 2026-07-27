import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
//import MemberCard from "../components/MemberCard";
import ChannelCard from "../components/ChannelCard";
//import AddMemberModal from "../components/AddMemberModal";
import ChannelModal from "../components/ChannelModal";
import {
  getWorkspaceMembers,
} from "../services/workspaceMemberApi";

import {
  getWorkspaceById,
 
} from "../services/workspaceApi";

import { getChannelsByWorkspace } from "../services/channelApi";

const WorkspaceDetails = () => {
  const { workspaceId } = useParams();

  const [search, setSearch] = useState("");

  const [workspace, setWorkspace] = useState<any>({});

  const [members, setMembers] = useState([]);

  const [channels, setChannels] = useState([]);

  const [openMemberModal, setOpenMemberModal] = useState(false);

  const [openChannelModal, setOpenChannelModal] = useState(false);

  const fetchWorkspace = async () => {
    const res = await getWorkspaceById(workspaceId!);
    setWorkspace(res.data.data);
  };

  const fetchMembers = async () => {
    const res = await getWorkspaceMembers(workspaceId!);
    setMembers(res.data.data);
  };

  const fetchChannels = async () => {
    const res = await getChannelsByWorkspace(workspaceId!);
    setChannels(res.data.data);
  };

  useEffect(() => {
    fetchWorkspace();
    fetchMembers();
    fetchChannels();
  }, []);

  return (
    <DashboardLayout
      search={search}
      setSearch={setSearch}
    >
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            {workspace.workspaceName}
          </h1>

          <p className="text-gray-500 mt-2">
            {workspace.description}
          </p>

        </div>

      </div>

      {/* Members */}

      <div className="mt-10 flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          Members
        </h2>

        <button
          onClick={() => setOpenMemberModal(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Member
        </button>

      </div>

      <div className="grid grid-cols-3 gap-5 mt-5">

        {members.map((member: any) => (
          <MemberCard
            key={member._id}
            member={member}
          />
        ))}

      </div>

      {/* Channels */}

      <div className="mt-10 flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          Channels
        </h2>

        <button
          onClick={() => setOpenChannelModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + Create Channel
        </button>

      </div>

      <div className="grid grid-cols-3 gap-5 mt-5">

        {channels.map((channel: any) => (
          <ChannelCard
            key={channel._id}
            channel={channel}
          />
        ))}

      </div>

      {openMemberModal && (
        <AddMemberModal
          workspaceId={workspaceId!}
          onClose={() => setOpenMemberModal(false)}
          fetchMembers={fetchMembers}
        />
      )}

      {openChannelModal && (
        <ChannelModal
          workspaceId={workspaceId!}
          onClose={() => setOpenChannelModal(false)}
          fetchChannels={fetchChannels}
        />
      )}

    </DashboardLayout>
  );
};

export default WorkspaceDetails;