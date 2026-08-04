import { useEffect, useState } from "react";

import {
  createDocument,
  updateDocument,
} from "../services/documentApi";

interface Props {
  workspaceId: string;
  fetchDocuments: () => void;
  onClose: () => void;
  document?: any;
}

const DocumentModal = ({
  workspaceId,
  fetchDocuments,
  onClose,
  document,
}: Props) => {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {

    if (document) {

      setFormData({
        title: document.title,
        content: document.content,
      });

    }

  }, [document]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      if (document) {

        await updateDocument(
          document._id,
          {
            workspaceId,
            title: formData.title,
            content: formData.content,
            createdBy: document.createdBy,
            lastEditedBy: user._id,
          }
        );

      } else {

        await createDocument({
          workspaceId,
          title: formData.title,
          content: formData.content,
          createdBy: user._id,
          lastEditedBy: user._id,
        });

      }

      fetchDocuments();

      onClose();

    } catch (err) {

      console.log(err);

    }

  };

  return (

<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

<div className="bg-white rounded-2xl shadow-2xl w-[700px]">

{/* Header */}

<div className="border-b px-8 py-5">

<h2 className="text-3xl font-bold">

{document ? "Edit Document" : "Create Document"}

</h2>

<p className="text-gray-500 mt-2">

Workspace Document

</p>

</div>

<form
onSubmit={handleSubmit}
className="p-8 space-y-6"
>

{/* Title */}

<div>

<label className="block font-semibold mb-2">

Title

</label>

<input
type="text"
name="title"
value={formData.title}
onChange={handleChange}
required
placeholder="Enter Document Title"
className="w-full border rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

</div>

{/* Content */}

<div>

<label className="block font-semibold mb-2">

Content

</label>

<textarea
name="content"
rows={12}
value={formData.content}
onChange={handleChange}
placeholder="Write your document here..."
className="w-full border rounded-xl px-5 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

</div>

{/* Buttons */}

<div className="flex justify-end gap-4">

<button
type="button"
onClick={onClose}
className="px-6 py-3 rounded-xl border hover:bg-gray-100"
>

Cancel

</button>

<button
type="submit"
className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
>

{document ? "Update" : "Create"}

</button>

</div>

</form>

</div>

</div>

  );
};

export default DocumentModal;