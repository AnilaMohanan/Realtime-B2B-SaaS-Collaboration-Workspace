import API from "../services/workspaceApi";
import type { Workspace } from "../types/workspace";

interface Props {
  workspaces: Workspace[];
  fetchWorkspaces: () => void;
}

const WorkspaceList = ({
  workspaces,
  fetchWorkspaces,
}: Props) => {

  const deleteWorkspace = async (id: string) => {
    try {
      await API.delete(`/${id}`);

      fetchWorkspaces();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <h2>Workspace List</h2>

      {workspaces.map((workspace) => (

        <div
          key={workspace._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
          }}
        >

          <h3>{workspace.workspaceName}</h3>

          <p>{workspace.description}</p>

          <p>{workspace.inviteCode}</p>

          <p>
            {workspace.isPrivate ? "Private" : "Public"}
          </p>

          <button
            onClick={() =>
              deleteWorkspace(workspace._id!)
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
};

export default WorkspaceList;