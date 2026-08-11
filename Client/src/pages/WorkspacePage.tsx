import DashboardLayout from "../layouts/DashboardLayout";
import WorkspaceCard from "../components/WorkspaceCard";
import WorkspaceModal from "../components/WorkspaceModal";

import { useEffect, useState } from "react";

import {
  getAllWorkspaces,
} from "../services/workspaceApi";

import {
  getDashboardStats,
} from "../services/getdashboardstatusApi";

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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const workspacesPerPage = 6;

  // =========================
  // Filter workspaces
  // =========================

  const filtered = workspaces.filter((workspace) =>
    workspace.workspaceName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // Pagination calculation
  // =========================

  const totalPages = Math.ceil(
    filtered.length / workspacesPerPage
  );

  const startIndex =
    (currentPage - 1) * workspacesPerPage;

  const currentWorkspaces = filtered.slice(
    startIndex,
    startIndex + workspacesPerPage
  );

  // =========================
  // Fetch workspaces
  // =========================

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);

      const res = await getAllWorkspaces();

      setWorkspaces(res.data.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Fetch dashboard stats
  // =========================

  const fetchDashboardStats = async () => {
    try {
      const res = await getDashboardStats();

      setStats(res.data.data);
    } catch (error) {
      console.error(
        "Error fetching dashboard stats:",
        error
      );
    }
  };

  // =========================
  // Initial loading
  // =========================

  useEffect(() => {
    fetchWorkspaces();
    fetchDashboardStats();
  }, []);

  // =========================
  // Reset pagination when search changes
  // =========================

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // =========================
  // If current page becomes invalid
  // =========================

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <DashboardLayout
      search={search}
      setSearch={setSearch}
    >

      {/* =========================
          Header
      ========================= */}

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

      {/* =========================
          Workspace Modal
      ========================= */}

      {open && (
        <WorkspaceModal
          fetchWorkspaces={() => {
            fetchWorkspaces();
            fetchDashboardStats();
          }}
          onClose={() => setOpen(false)}
        />
      )}

      {/* =========================
          Workspace Section
      ========================= */}

      <h2 className="text-2xl font-bold mt-12 mb-6">
        Workspaces
      </h2>

      {/* =========================
          Loading
      ========================= */}

      {loading ? (

        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            Loading workspaces...
          </p>
        </div>

      ) : filtered.length === 0 ? (

        /* =========================
           No Workspaces
        ========================= */

        <div className="text-center py-10">

          <p className="text-gray-500 text-lg">
            {search
              ? "No workspaces found for your search."
              : "No workspaces found."}
          </p>

        </div>

      ) : (

        /* =========================
           Workspace Cards
        ========================= */

        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {currentWorkspaces.map((workspace) => (

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

          {/* =========================
              Pagination
          ========================= */}

          {totalPages > 1 && (

            <div className="flex justify-center items-center gap-2 mt-10">

              {/* Previous */}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg
                disabled:opacity-40
                disabled:cursor-not-allowed
                hover:bg-gray-100"
              >
                Previous
              </button>

              {/* Page Numbers */}

              {Array.from(
                { length: totalPages },
                (_, index) => {

                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() =>
                        setCurrentPage(pageNumber)
                      }
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === pageNumber
                          ? "bg-blue-600 text-white"
                          : "border hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
              )}

              {/* Next */}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                  )
                }
                disabled={
                  currentPage === totalPages
                }
                className="px-4 py-2 border rounded-lg
                disabled:opacity-40
                disabled:cursor-not-allowed
                hover:bg-gray-100"
              >
                Next
              </button>

            </div>
          )}

          {/* =========================
              Page Information
          ========================= */}

          <p className="text-center text-gray-500 mt-4">

            Showing{" "}
            {startIndex + 1}
            {" - "}
            {Math.min(
              startIndex + workspacesPerPage,
              filtered.length
            )}
            {" of "}
            {filtered.length}
            {" workspaces"}

          </p>

        </>

      )}

    </DashboardLayout>
  );
};

export default WorkspacePage;