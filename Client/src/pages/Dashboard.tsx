import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/StatsCard";
import WorkspaceCard from "../components/WorkspaceCard";
import { useEffect, useState } from "react";
import { getAllWorkspaces } from "../services/workspaceApi";
import WorkspaceModal from "../components/WorkspaceModal";
import {
  FaUsers,
  FaBuilding,
  FaComments
} from "react-icons/fa";

import type { Workspace } from "../types/workspace";


const Dashboard = () => {
const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
const [loading, setLoading] = useState(true);
const [open, setOpen] = useState(false);
const [search, setSearch] = useState("");

const filtered = workspaces.filter((workspace) =>
  workspace.workspaceName
    .toLowerCase()
    .includes(search.toLowerCase())
);
    const fetchWorkspaces = async () => {

  try {

    setLoading(true);

    const res = await getAllWorkspaces();

    setWorkspaces(res.data.data);

  } catch (err) {

    console.log(err);

  } finally {

    setLoading(false);

  }

};
useEffect(() => {

    fetchWorkspaces();

}, []);

  return (
    
    <DashboardLayout  search={search} setSearch={setSearch}>

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Workspace Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your workspaces in one place.
          </p>

        </div>

<button
    onClick={() => setOpen(true)}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
>
    + Create Workspace
  
</button>
  {
    open &&

    <WorkspaceModal
        fetchWorkspaces={fetchWorkspaces}
        onClose={() => setOpen(false)}
    />
}
      </div>

      <div className="grid grid-cols-3 gap-6 mt-10">

        <StatsCard
          title="Total Workspaces"
          value={18}
          icon={<FaBuilding />}
          color="bg-blue-500"
        />

        <StatsCard
          title="Members"
          value={145}
          icon={<FaUsers />}
          color="bg-green-500"
        />

        <StatsCard
          title="Channels"
          value={52}
          icon={<FaComments />}
          color="bg-purple-500"
        />

      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">
        Workspaces
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {filtered.map((workspace) => (
          <WorkspaceCard
            key={workspace._id}
    workspace={workspace}
    fetchWorkspaces={fetchWorkspaces}
          />
        ))}

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;