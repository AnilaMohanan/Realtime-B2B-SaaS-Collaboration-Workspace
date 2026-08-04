import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getDocumentById,
  updateDocument,
} from "../services/documentApi";

import {
  FaArrowLeft,
  FaSave,
  FaFileAlt,
  FaUserEdit,
} from "react-icons/fa";

const DocumentEditor = () => {

  const { documentId } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [document, setDocument] = useState<any>({
    title: "",
    content: "",
    createdBy: "",
    workspaceId: "",
  });

  const fetchDocument = async () => {

    try {

      const res =
        await getDocumentById(documentId!);

      setDocument(res.data.data);

      setLoading(false);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchDocument();

  }, []);

  const handleSave = async () => {

    try {

      await updateDocument(documentId!, {

        workspaceId: document.workspaceId,

        title: document.title,

        content: document.content,

        createdBy:
          document.createdBy?._id ||
          document.createdBy,

        lastEditedBy: user._id,

      });

      alert("Document Updated Successfully");

    } catch (err) {

      console.log(err);

    }

  };

  if (loading) {

    return (

      <DashboardLayout
        search={search}
        setSearch={setSearch}
      >

        <div className="flex justify-center items-center h-[80vh]">

          <h2 className="text-2xl font-bold">

            Loading Document...

          </h2>

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout
      search={search}
      setSearch={setSearch}
    >

      <div className="space-y-6">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

          <div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-600 font-semibold mb-4"
            >

              <FaArrowLeft />

              Back

            </button>

            <div className="flex items-center gap-3">

              <FaFileAlt
                className="text-blue-600"
                size={35}
              />

              <h1 className="text-3xl font-bold">

                Document Editor

              </h1>

            </div>

          </div>

          <button

            onClick={handleSave}

            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"

          >

            <FaSave />

            Save

          </button>

        </div>

        {/* Title */}

        <div className="bg-white rounded-xl shadow p-6">

          <label className="font-semibold">

            Title

          </label>

          <input

            type="text"

            value={document.title}

            onChange={(e) =>
              setDocument({
                ...document,
                title: e.target.value,
              })
            }

            className="w-full mt-3 border rounded-xl px-5 py-3 text-xl"

          />

        </div>

        {/* Content */}

        <div className="bg-white rounded-xl shadow p-6">

          <label className="font-semibold">

            Content

          </label>

          <textarea

            rows={18}

            value={document.content}

            onChange={(e) =>
              setDocument({
                ...document,
                content: e.target.value,
              })
            }

            className="w-full mt-4 border rounded-xl p-5 resize-none"

          />

        </div>

        {/* Footer */}

        <div className="bg-white rounded-xl shadow p-6 flex justify-between">

          <div className="flex items-center gap-2">

            <FaUserEdit />

            <span>

              Last Edited By :

            </span>

            <strong>

              {user.name}

            </strong>

          </div>

          <button

            onClick={handleSave}

            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"

          >

            Save Changes

          </button>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default DocumentEditor;