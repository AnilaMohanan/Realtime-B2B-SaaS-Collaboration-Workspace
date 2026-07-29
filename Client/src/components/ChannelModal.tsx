import { useState } from "react";

import {
  createChannel,
  updateChannel,
} from "../services/channelApi";

//import { getAllWorkspaces } from "../services/workspaceApi";

interface Props {
  fetchChannels: () => void;
  onClose: () => void;
  workspaceId: string;
  channel?: any;
}

const ChannelModal = ({
  fetchChannels,
  onClose,
   workspaceId,
  channel,
}: Props) => {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

 // const [workspaces, setWorkspaces] = useState<any[]>([]);

 const [formData, setFormData] = useState({
  workspaceId,
  channelName: channel?.channelName || "",
  description: channel?.description || "",
});

  


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const submit = async () => {

    try {

      const payload = {
        ...formData,
        createdBy: user._id,
      };

      if (channel?._id) {

        await updateChannel(
          channel._id,
          payload
        );

        alert("Channel updated successfully");

      } else {

        await createChannel(payload);

        alert("Channel created successfully");

      }

      fetchChannels();

      onClose();

    } catch (err) {

      console.log(err);

      alert("Operation Failed");

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[550px] p-8">

        <h2 className="text-3xl font-bold text-center mb-8">

          {channel
            ? "Edit Channel"
            : "Create Channel"}

        </h2>

        {/* Workspace */}

 

        {/* Channel Name */}

        <div className="mb-5">

          <label className="block font-semibold mb-2">

            Channel Name

          </label>

          <input
            type="text"
            name="channelName"
            value={formData.channelName}
            onChange={handleChange}
            placeholder="Enter Channel Name"
            className="border rounded-lg p-3 w-full"
          />

        </div>

        {/* Description */}

        <div className="mb-8">

          <label className="block font-semibold mb-2">

            Description

          </label>

          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="border rounded-lg p-3 w-full"
          />

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="border border-gray-400 px-6 py-2 rounded-lg hover:bg-gray-100"
          >

            Cancel

          </button>

          <button
            onClick={submit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >

            {channel
              ? "Update Channel"
              : "Create Channel"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default ChannelModal;