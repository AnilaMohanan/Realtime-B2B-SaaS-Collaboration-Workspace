interface Props {
  workspaceName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteWorkspaceModal = ({
  workspaceName,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[420px] p-8 shadow-xl">

        <h2 className="text-2xl font-bold text-red-600">
          Delete Workspace
        </h2>

        <p className="mt-5 text-gray-600">

          Are you sure you want to delete

          <span className="font-bold text-black">
            {" "}
            {workspaceName}
          </span>

          ?

        </p>

        <p className="text-red-500 mt-2 text-sm">

          This action cannot be undone.

        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onCancel}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteWorkspaceModal;