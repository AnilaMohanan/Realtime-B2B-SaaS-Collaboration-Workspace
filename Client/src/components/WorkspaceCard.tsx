import {
  FaLock,
  FaGlobe,
  FaEdit,
  FaTrash,
  FaArrowRight
} from "react-icons/fa";

import type { Workspace } from "../types/workspace";
import { deleteWorkspace } from "../services/workspaceApi";
import DeleteWorkspaceModal from "./DeleteWorkspaceModal";
import { useState } from "react";
import WorkspaceModal from "./WorkspaceModal";
import { useNavigate } from "react-router-dom";

interface Props {
  workspace: Workspace;
  fetchWorkspaces: () => void;
  
}

 const navigate = useNavigate();
const WorkspaceCard = ({ workspace,fetchWorkspaces }: Props) => {
  const [showDelete, setShowDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
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

        <button  onClick={() =>
    navigate(`/workspaces/${workspace._id}`)
  } className="text-blue-600 flex items-center gap-2">

          <FaArrowRight />

          Open

        </button>

        <div className="flex gap-4">

<button onClick={() => setOpenEdit(true)}>
  <FaEdit className="text-yellow-500 text-lg" />
</button>

  <button
  onClick={() => setShowDelete(true)}
  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
>
  <FaTrash className="text-white" />
</button>

        </div>

      </div>
      
{
  showDelete && (

    <DeleteWorkspaceModal

      workspaceName={workspace.workspaceName}

      onConfirm={removeWorkspace}

      onCancel={() => setShowDelete(false)}

    />

  )
}
{
  openEdit && (
    <WorkspaceModal
      workspace={workspace}
      fetchWorkspaces={fetchWorkspaces}
      onClose={() => setOpenEdit(false)}
    />
  )
}
    </div>
  );
};

export default WorkspaceCard;