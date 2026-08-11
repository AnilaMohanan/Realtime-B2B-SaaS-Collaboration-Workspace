import { useEffect, useState } from "react";
import type { Workspace } from "../types/workspace";
import WorkspaceCard from "./WorkspaceCard";

interface Props {
  workspaces: Workspace[];
  fetchWorkspaces: () => void;
}

const WorkspaceList = ({
  workspaces,
  fetchWorkspaces,
}: Props) => {
  // =========================
  // Pagination State
  // =========================

  const [currentPage, setCurrentPage] = useState(1);

  const workspacesPerPage = 6;

  // =========================
  // Calculate Total Pages
  // =========================

  const totalPages = Math.ceil(
    workspaces.length / workspacesPerPage
  );

  // =========================
  // Calculate Starting Index
  // =========================

  const startIndex =
    (currentPage - 1) * workspacesPerPage;

  // =========================
  // Workspaces for Current Page
  // =========================

  const currentWorkspaces = workspaces.slice(
    startIndex,
    startIndex + workspacesPerPage
  );

  // =========================
  // Reset Page When Data Changes
  // =========================

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [workspaces.length, currentPage, totalPages]);

  return (
    <div className="w-full">

      {/* =========================
          Title
      ========================= */}

      <h2 className="text-2xl font-bold mb-6">
        Workspace List
      </h2>

      {/* =========================
          Workspace Cards
      ========================= */}

      {currentWorkspaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {currentWorkspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace._id}
              workspace={workspace}
              fetchWorkspaces={fetchWorkspaces}
            />
          ))}

        </div>
      ) : (
        <p className="text-gray-500 mt-6">
          No workspaces found.
        </p>
      )}

      {/* =========================
          Pagination
      ========================= */}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">

          {/* Previous Button */}

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

          {/* Next Button */}

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

      {workspaces.length > 0 && (
        <p className="text-center text-gray-500 mt-4">

          Showing{" "}
          {startIndex + 1}-
          {Math.min(
            startIndex + workspacesPerPage,
            workspaces.length
          )}{" "}
          of {workspaces.length} workspaces

        </p>
      )}

    </div>
  );
};

export default WorkspaceList;