import { useState } from "react";
import { createWorkspace } from "../services/workspaceApi";

interface Props {
  fetchWorkspaces: () => void;
  onClose: () => void;
}

const WorkspaceModal = ({ fetchWorkspaces, onClose }: Props) => {

  const [formData, setFormData] = useState({
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

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    });
  };

  const submit = async () => {
  try {
    await createWorkspace(formData);

    alert("✅ Workspace created successfully!");

    fetchWorkspaces();

    onClose();
  } catch (error) {
    console.error(error);
    alert("❌ Failed to create workspace.");
  }
};

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-8 w-[500px]">

        <h2 className="text-2xl font-bold mb-6">

          Create Workspace

        </h2>

        <input
          className="border w-full p-3 rounded mb-4"
          placeholder="Workspace Name"
          name="workspaceName"
          value={formData.workspaceName}
          onChange={handleChange}
        />

        <textarea
          className="border w-full p-3 rounded mb-4"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          className="border w-full p-3 rounded mb-4"
          placeholder="Owner Id"
          name="ownerId"
          value={formData.ownerId}
          onChange={handleChange}
        />

        <input
          className="border w-full p-3 rounded mb-4"
          placeholder="Invite Code"
          name="inviteCode"
          value={formData.inviteCode}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 mb-6">

          <input
            type="checkbox"
            name="isPrivate"
            checked={formData.isPrivate}
            onChange={handleChange}
          />

          Private Workspace

        </label>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Create
          </button>

        </div>

      </div>

    </div>

  );
};

export default WorkspaceModal;