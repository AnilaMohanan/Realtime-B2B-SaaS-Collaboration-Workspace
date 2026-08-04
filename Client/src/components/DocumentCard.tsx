import { FaFileAlt, FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteDocument } from "../services/documentApi";

interface Props {
  document: any;
  fetchDocuments: () => void;
  onEdit: () => void;
}

const DocumentCard = ({
  document,
  fetchDocuments,
  onEdit,
}: Props) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDocument(document._id);

      fetchDocuments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="p-6">

        {/* Top */}

        <div className="flex justify-between">

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">

              <FaFileAlt
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold">

                {document.title}

              </h2>

              <p className="text-sm text-gray-500 mt-1">

                Last Updated

              </p>

            </div>

          </div>

          <div>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">

              Active

            </span>

          </div>

        </div>

        {/* Content */}

        <div className="mt-5">

          <p className="text-gray-600 line-clamp-3">

            {document.content || "No content available."}

          </p>

        </div>

        {/* Footer */}

        <div className="mt-6 flex justify-between items-center">

          <div className="text-sm text-gray-500">

            Edited By

            <span className="font-semibold ml-2">

              {document.lastEditedBy?.name || "Unknown"}

            </span>

          </div>

          <div className="flex gap-3">

      <button
  onClick={() =>
    navigate(`/documents/${document._id}`)
  }
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
>
  Open

  <FaArrowRight />
</button>

<button
  onClick={onEdit}
  className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg"
>
  <FaEdit />
</button>

            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
            >
              <FaTrash />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DocumentCard;