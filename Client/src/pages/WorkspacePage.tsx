import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/StatsCard";
import WorkspaceCard from "../components/WorkspaceCard";
import WorkspaceModal from "../components/WorkspaceModal";

import { useEffect, useState } from "react";

import {
  FaUsers,
  FaBuilding,
  FaComments,
} from "react-icons/fa";

import {
  getAllWorkspaces,
} from "../services/workspaceApi";

import { getDashboardStats } from "../services/getdashboardstatusApi";

import type { Workspace } from "../types/workspace";

const WorkspacePage = () => {

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    totalWorkspaces: 0,
    totalMembers: 0,
    totalChannels: 0,
  });

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

  const fetchDashboardStats = async () => {

    try {

      const res = await getDashboardStats();

      setStats(res.data.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchWorkspaces();

    fetchDashboardStats();

  }, []);

  return (

    <DashboardLayout
      search={search}
      setSearch={setSearch}
    >

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
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          + Create Workspace
        </button>

      </div>

      {open && (
        <WorkspaceModal
          fetchWorkspaces={() => {
            fetchWorkspaces();
            fetchDashboardStats();
          }}
          onClose={() => setOpen(false)}
        />
      )}

     

      <h2 className="text-2xl font-bold mt-12 mb-6">

        Workspaces

      </h2>

      {loading ? (

        <div className="text-center text-xl mt-10">

          Loading...

        </div>

      ) : (

        <div className="grid grid-cols-3 gap-6">

          {filtered.map((workspace) => (

            <WorkspaceCard
              key={workspace._id}
              workspace={workspace}
              fetchWorkspaces={() => {
                fetchWorkspaces();
                fetchDashboardStats();
              }}
            />

          ))}

        </div>

      )}

    </DashboardLayout>

  );

};

export default WorkspacePage;