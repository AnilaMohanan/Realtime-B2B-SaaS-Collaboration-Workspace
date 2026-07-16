import {
  FaLock,
  FaGlobe,
  FaEdit,
  FaTrash,
  FaArrowRight
} from "react-icons/fa";

import type { Workspace } from "../types/workspace";
import { deleteWorkspace } from "../services/workspaceApi";



interface Props {
  workspace: Workspace;
  fetchWorkspaces: () => void;
  
}




const WorkspaceCard = ({ workspace,fetchWorkspaces }: Props) => {
  const removeWorkspace = async () => {
  if (!workspace._id) return;

  try {
    await deleteWorkspace(workspace._id);

    alert("Workspace deleted successfully");

    fetchWorkspaces();
  } catch (error) {
    console.error(error);
    alert("Failed to delete workspace");
  }
};
  
    return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

      <div className="flex justify-between">

        <h2 className="text-xl font-bold">
          {workspace.workspaceName}
        </h2>

        {workspace.isPrivate ? (
          <FaLock className="text-red-500" />
        ) : (
          <FaGlobe className="text-green-500" />
        )}

      </div>

      <p className="text-gray-500 mt-3">
        {workspace.description}
      </p>

      <div className="mt-5">

        <p className="text-sm">

          <span className="font-semibold">
            Invite Code :
          </span>

          {" "}
          {workspace.inviteCode}

        </p>

      </div>

      <div className="flex justify-between mt-6">

        <button className="text-blue-600 flex items-center gap-2">

          <FaArrowRight />

          Open

        </button>

        <div className="flex gap-4">

          <button>

            <FaEdit className="text-yellow-500" />

          </button>

        <button onClick={removeWorkspace}>
    <FaTrash className="text-red-500" />
</button>

        </div>

      </div>

    </div>
  );
};

export default WorkspaceCard;