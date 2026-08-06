import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/StatsCard";

import {
  FaBuilding,
  FaUsers,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";

import {
  getDashboardStats,
} from "../services/getdashboardstatusApi";

import {
  getAllWorkspaces,
} from "../services/workspaceApi";

import {
  getAllChannels,
} from "../services/channelApi";

const Dashboard = () => {
const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    totalWorkspaces: 0,
    totalMembers: 0,
    totalChannels: 0,
  });

  const [workspaces, setWorkspaces] = useState<any[]>([]);

  const [channels, setChannels] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const statsRes =
        await getDashboardStats();

      setStats(statsRes.data.data);

      const workspaceRes =
        await getAllWorkspaces();

      setWorkspaces(
        workspaceRes.data.data.slice(0, 4)
      );

      const channelRes =
        await getAllChannels();

      setChannels(
        channelRes.data.data.slice(0, 6)
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchDashboard();
 const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }
  }, []);

  return (

    <DashboardLayout
      search={search}
      setSearch={setSearch}
    >

      {/* Welcome Banner */}

      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-10 text-white shadow-xl">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-bold">

              Welcome Back 👋

            </h1>

            <p className="mt-5 text-lg text-blue-100">

              Manage your teams, workspaces and
              collaborate with your members in real time.

            </p>

          </div>

          <Link
            to="/workspaces"
            className="bg-white text-blue-700 font-semibold px-7 py-4 rounded-xl hover:bg-gray-100"
          >

            View Workspaces

          </Link>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-3 gap-8 mt-10">

        <StatsCard
          title="Total Workspaces"
          value={stats.totalWorkspaces}
          icon={<FaBuilding />}
          color="bg-blue-600"
        />

        <StatsCard
          title="Total Members"
          value={stats.totalMembers}
          icon={<FaUsers />}
          color="bg-green-600"
        />

        <StatsCard
          title="Total Channels"
          value={stats.totalChannels}
          icon={<FaComments />}
          color="bg-purple-600"
        />

      </div>


            {/* Main Content */}



            {/* Bottom Section */}

      <div className="grid grid-cols-12 gap-8 mt-10">

        {/* Quick Overview */}

        <div className="col-span-8 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-8">

            Quick Overview

          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">

                    Total Workspaces

                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-blue-700">

                    {stats.totalWorkspaces}

                  </h2>

                </div>

                <FaBuilding
                  className="text-blue-600"
                  size={40}
                />

              </div>

            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">

                    Team Members

                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-green-700">

                    {stats.totalMembers}

                  </h2>

                </div>

                <FaUsers
                  className="text-green-600"
                  size={40}
                />

              </div>

            </div>

            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">

                    Channels

                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-purple-700">

                    {stats.totalChannels}

                  </h2>

                </div>

                <FaComments
                  className="text-purple-600"
                  size={40}
                />

              </div>

            </div>

            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">

                    Collaboration

                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-orange-600">

                    100%

                  </h2>

                </div>

                <FaUsers
                  className="text-orange-500"
                  size={40}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="col-span-4 bg-white rounded-2xl shadow-lg">

          <div className="border-b px-6 py-6">

            <h2 className="text-2xl font-bold">

              Recent Activity

            </h2>

            <p className="text-gray-500 mt-1">

              Latest updates

            </p>

          </div>

          <div className="p-6 space-y-5">

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

                <FaBuilding className="text-blue-600"/>

              </div>

              <div>

                <h3 className="font-semibold">

                  Workspace Created

                </h3>

                <p className="text-gray-500 text-sm">

                  A new workspace has been added.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">

                <FaUsers className="text-green-600"/>

              </div>

              <div>

                <h3 className="font-semibold">

                  Member Joined

                </h3>

                <p className="text-gray-500 text-sm">

                  A member joined a workspace.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">

                <FaComments className="text-purple-600"/>

              </div>

              <div>

                <h3 className="font-semibold">

                  New Channel

                </h3>

                <p className="text-gray-500 text-sm">

                  A new channel has been created.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">

                <FaBuilding className="text-orange-600"/>

              </div>

              <div>

                <h3 className="font-semibold">

                  Workspace Updated

                </h3>

                <p className="text-gray-500 text-sm">

                  Workspace information was updated.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
            {/* Quick Navigation */}

      <div className="grid grid-cols-3 gap-8 mt-10">

        <Link
          to="/workspaces"
          className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
        >

          <FaBuilding
            size={40}
            className="text-blue-600 mb-5"
          />

          <h2 className="text-2xl font-bold">

            Manage Workspaces

          </h2>

          <p className="text-gray-500 mt-3">

            Create, edit and organize all your workspaces.

          </p>

        </Link>

        <Link
          to="/channels"
          className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
        >

          <FaComments
            size={40}
            className="text-purple-600 mb-5"
          />

          <h2 className="text-2xl font-bold">

            Browse Channels

          </h2>

          <p className="text-gray-500 mt-3">

            View and manage all communication channels.

          </p>

        </Link>

        <div
          className="bg-white rounded-2xl shadow-lg p-8"
        >

          <FaUsers
            size={40}
            className="text-green-600 mb-5"
          />

          <h2 className="text-2xl font-bold">

            Team Collaboration

          </h2>

          <p className="text-gray-500 mt-3">

            Invite members, assign roles and collaborate
            with your team in real time.

          </p>

        </div>

      </div>

    </DashboardLayout>

  );

};


export default Dashboard;