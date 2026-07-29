import { useState } from "react";

import {
  addWorkspaceMember,
  updateWorkspaceMember,
} from "../services/workspaceMemberApi";

interface Props {
  workspaceId: string;
  fetchMembers: () => void;
  onClose: () => void;
  member?: any;
}

const MemberModal = ({
  workspaceId,
  fetchMembers,
  onClose,
  member,
}: Props) => {
  const [formData, setFormData] = useState({
    userId: member?.userId?._id || "",
    role: member?.role || "Member",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    try {
      const payload = {
        workspaceId,
        userId: formData.userId,
        role: formData.role,
      };

      if (member?._id) {
        await updateWorkspaceMember(member._id, payload);
        alert("Member updated successfully");
      } else {
        await addWorkspaceMember(payload);
        alert("Member added successfully");
      }

      fetchMembers();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[500px] rounded-xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center mb-8">
          {member ? "Edit Member" : "Add Member"}
        </h2>

        {/* User Id */}

        <div className="mb-5">

          <label className="block font-semibold mb-2">
            User ID
          </label>

          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter User ID"
            className="border rounded-lg p-3 w-full"
          />

        </div>

        {/* Role */}

        <div className="mb-8">

          <label className="block font-semibold mb-2">
            Role
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          >
            <option value="Member">
              Member
            </option>

            <option value="Admin">
              Admin
            </option>

          </select>

        </div>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            {member ? "Update Member" : "Add Member"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default MemberModal;