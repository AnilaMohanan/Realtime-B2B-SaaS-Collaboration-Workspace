import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import MemberCard from "../components/MemberCard";
import ChannelCard from "../components/ChannelCard";

import MemberModal from "../components/MemberModal";
import ChannelModal from "../components/ChannelModal";
import DocumentCard from "../components/DocumentCard";

import DocumentModal from "../components/DocumentModal";
import {getDocumentsByWorkspace, 
} from "../services/documentApi";

import {
  FaFileAlt,
} from "react-icons/fa";
import {
  FaUsers,
  FaComments,
  FaBuilding,
  FaPlus,
  FaLock,
  FaGlobe,
} from "react-icons/fa";

import {
  getWorkspaceById,
} from "../services/workspaceApi";

import {
  getWorkspaceMembers,
} from "../services/workspaceMemberApi";

import {
  getChannelsByWorkspace,
} from "../services/channelApi";

const WorkspaceDetails = () => {

const { workspaceId } = useParams();

const [search, setSearch] = useState("");

const [workspace, setWorkspace] = useState<any>({});

const [members, setMembers] = useState<any[]>([]);

const [channels, setChannels] = useState<any[]>([]);
const [documents, setDocuments] =
useState<any[]>([]);

const [openDocumentModal, setOpenDocumentModal] =
useState(false);

const [selectedDocument, setSelectedDocument] =
useState<any>(null);
const [openMemberModal, setOpenMemberModal] =
useState(false);

const [openChannelModal, setOpenChannelModal] =
useState(false);

const [selectedMember, setSelectedMember] =
useState<any>(null);



const fetchWorkspace = async () => {

try{

const res =
await getWorkspaceById(workspaceId!);

setWorkspace(res.data.data);

}
catch(err){

console.log(err);

}

};

const fetchMembers = async () => {

try{

const res =
await getWorkspaceMembers(workspaceId!);

setMembers(res.data.data);

}
catch(err){

console.log(err);

}

};

const fetchChannels = async () => {

try{

const res =
await getChannelsByWorkspace(workspaceId!);

setChannels(res.data.data);

}
catch(err){

console.log(err);

}

};
const fetchDocuments = async () => {

  try {

    const res =
      await getDocumentsByWorkspace(
        workspaceId!
      );

    setDocuments(res.data.data);

  } catch (err) {

    console.log(err);

  }

};


useEffect(() => {

fetchWorkspace();

fetchMembers();

fetchChannels();

fetchDocuments();
}, []);
return (

<DashboardLayout
search={search}
setSearch={setSearch}
>

<div className="space-y-8">
<div className="bg-white rounded-2xl shadow-lg p-8">

<div className="flex justify-between items-center">

<div>

<div className="flex items-center gap-4">

<FaBuilding
className="text-blue-600"
size={35}
/>

<h1 className="text-4xl font-bold">

{workspace.workspaceName}

</h1>

</div>

<p className="text-gray-500 mt-4">

{workspace.description}

</p>

</div>

<div className="flex gap-4">

<div className="bg-blue-50 rounded-xl px-6 py-4 text-center">

<p className="text-gray-500">

Members

</p>

<h2 className="text-3xl font-bold text-blue-600">

{members.length}

</h2>

</div>

<div className="bg-green-50 rounded-xl px-6 py-4 text-center">

<p className="text-gray-500">

Channels

</p>

<h2 className="text-3xl font-bold text-green-600">

{channels.length}

</h2>

</div>

<div className="bg-purple-50 rounded-xl px-6 py-4 text-center">

<p className="text-gray-500">

Invite Code

</p>

<h2 className="text-xl font-bold text-purple-600">

{workspace.inviteCode}

</h2>

</div>

</div>

</div>

</div>
<div className="grid grid-cols-12 gap-8">
  {/* Left Sidebar */}

<div className="col-span-4">

  <div className="bg-white rounded-2xl shadow-lg">

    {/* Header */}

    <div className="flex justify-between items-center p-6 border-b">

      <div>

        <h2 className="text-2xl font-bold flex items-center gap-2">

          <FaUsers className="text-blue-600" />

          Members

        </h2>

        <p className="text-gray-500 mt-1">

          {members.length} Workspace Members

        </p>

      </div>

      <button
        onClick={() => {
          setSelectedMember(null);
          setOpenMemberModal(true);
        }}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <FaPlus />

        Add

      </button>

    </div>

    {/* Member List */}

    <div className="p-5 max-h-[700px] overflow-y-auto">

      {members.length === 0 ? (

        <div className="text-center py-10">

          <FaUsers
            size={50}
            className="mx-auto text-gray-300"
          />

          <p className="text-gray-500 mt-4">

            No Members Found

          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {members.map((member: any) => (

            <MemberCard
              key={member._id}
              member={member}
              fetchMembers={fetchMembers}
              onEdit={() => {
                setSelectedMember(member);
                setOpenMemberModal(true);
              }}
            />

          ))}

        </div>

      )}

    </div>

  </div>

</div>

{/* Right Panel */}


          {/* Right Panel - Channels */}

          <div className="col-span-8 bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

            {/* Header */}

            <div className="flex items-center justify-between px-8 py-6 border-b">

              <div>

                <h2 className="text-2xl font-bold">
                  Channels
                </h2>

                <p className="text-gray-500 mt-1">
                  {channels.length} Channels
                </p>

              </div>

              <button
                onClick={() => setOpenChannelModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
              >
                + Create Channel
              </button>

            </div>

            {/* Empty */}

            {channels.length === 0 ? (

              <div className="text-center py-20">

                <div className="text-6xl mb-4">
                  💬
                </div>

                <h2 className="text-2xl font-bold">
                  No Channels Yet
                </h2>

                <p className="text-gray-500 mt-3">

                  Create your first channel for this workspace.

                </p>

                <button
                  onClick={() =>
                    setOpenChannelModal(true)
                  }
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Create Channel
                </button>

              </div>

            ) : (

              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 p-6">

                {channels.map((channel: any) => (

                  <div
                    key={channel._id}
                    className="border rounded-xl hover:shadow-lg transition bg-white"
                  >

                    <ChannelCard
                      channel={channel}
                      fetchChannels={fetchChannels}
                    />

                  </div>

                ))}

              </div>

            )}

       
      {/* Document  */}
<div className="mt-8 bg-white rounded-2xl shadow-lg">

  {/* Header */}

  <div className="flex justify-between items-center p-6 border-b">

    <div>

      <h2 className="text-2xl font-bold flex items-center gap-2">

        <FaFileAlt className="text-blue-600"/>

        Documents

      </h2>

      <p className="text-gray-500">

        {documents.length} Documents

      </p>

    </div>

    <button

      onClick={() => {

        setSelectedDocument(null);

        setOpenDocumentModal(true);

      }}

      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"

    >

      + New Document

    </button>

  </div>

  {/* Search */}

  <div className="p-5">

    <input

      type="text"

      placeholder="Search Documents..."

      className="w-full border rounded-lg px-4 py-3"

    />

  </div>

  {/* Documents */}

  <div className="p-5">

    {documents.length === 0 ? (

      <div className="text-center py-10">

        <FaFileAlt

          size={55}

          className="mx-auto text-gray-300"

        />

        <h2 className="text-xl font-semibold mt-5">

          No Documents Found

        </h2>

      </div>

    ) : (

      <div className="space-y-5">

        {documents.map((document:any)=>(

     <DocumentCard
  document={document}
  fetchDocuments={fetchDocuments}
  onEdit={() => {
    setSelectedDocument(document);
    setOpenDocumentModal(true);
  }}
/>

        ))}

      </div>

    )}

  </div>

</div>
      {/* Member Modal */}

      {openMemberModal && (

        <MemberModal
          workspaceId={workspaceId!}
          member={selectedMember}
          fetchMembers={fetchMembers}
          onClose={() =>
            setOpenMemberModal(false)
          }
        />

      )}

      {/* Channel Modal */}

      {openChannelModal && (

        <ChannelModal
          workspaceId={workspaceId!}
          fetchChannels={fetchChannels}
          onClose={() =>
            setOpenChannelModal(false)
          }
        />

      )}
 {/* Document Modal */}


      {openDocumentModal && (

  <DocumentModal

    workspaceId={workspaceId!}

    document={selectedDocument}

    fetchDocuments={fetchDocuments}

    onClose={() =>

      setOpenDocumentModal(false)

    }

  />

)}
</div>   {/* End Right Panel */}

</div>   {/* End grid */}

</div>   {/* End space-y-8 */}
    </DashboardLayout>

  );

};

export default WorkspaceDetails;