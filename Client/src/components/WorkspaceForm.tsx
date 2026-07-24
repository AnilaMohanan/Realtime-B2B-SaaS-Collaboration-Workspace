import { useState } from "react";
import API from "../services/workspaceApi";
import type { Workspace } from "../types/workspace";

interface Props {
  fetchWorkspaces: () => void;
}

const WorkspaceForm = ({ fetchWorkspaces }: Props) => {
  const [workspace, setWorkspace] = useState<Workspace>({
    workspaceName: "",
    description: "",
    ownerId: "",
    inviteCode: "",
    isPrivate: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setWorkspace({
      ...workspace,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/", workspace);

      alert("Workspace Created Successfully");

      fetchWorkspaces();

      setWorkspace({
        workspaceName: "",
        description: "",
        ownerId: "",
        inviteCode: "",
        isPrivate: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="workspaceName"
        placeholder="Workspace Name"
        value={workspace.workspaceName}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="description"
        placeholder="Description"
        value={workspace.description}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="ownerId"
        placeholder="Owner ID"
        value={workspace.ownerId}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="inviteCode"
        placeholder="Invite Code"
        value={workspace.inviteCode}
        onChange={handleChange}
      />

      <br /><br />

      <label>
        Private

        <input
          type="checkbox"
          name="isPrivate"
          checked={workspace.isPrivate}
          onChange={handleChange}
        />
      </label>

      <br /><br />

      <button type="submit">
        Create Workspace
      </button>

    </form>
  );
};

export default WorkspaceForm;