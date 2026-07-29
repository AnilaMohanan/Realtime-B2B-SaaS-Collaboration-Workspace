import { FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";
import { deleteWorkspaceMember } from "../services/workspaceMemberApi";

interface Props {
  member: any;
  fetchMembers: () => void;
  onEdit: () => void;
}

const MemberCard = ({
  member,
  fetchMembers,
  onEdit,
}: Props) => {

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to remove this member?"
    );

    if (!confirmDelete) return;

    try {

      await deleteWorkspaceMember(member._id);

      alert("Member removed successfully");

      fetchMembers();

    } catch (err) {

      console.log(err);

      alert("Failed to remove member");

    }

  };

  return (

    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">

      <div className="flex items-center gap-4">

        <FaUserCircle
          size={60}
          className="text-blue-600"
        />

        <div>

          <h2 className="text-xl font-bold">
            {member.userId?.name}
          </h2>

          <p className="text-gray-500">
            {member.userId?.email}
          </p>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
              member.role === "Admin"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {member.role}
          </span>

        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>

  );

};

export default MemberCard;