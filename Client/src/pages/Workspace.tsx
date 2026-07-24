import { useEffect, useState } from "react";
import API from "../services/workspaceApi";
import WorkspaceForm from "../components/WorkspaceForm";
import WorkspaceList from "../components/WorkspaceList";
import type { Workspace } from "../types/workspace";

const WorkspacePage = () => {

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const fetchWorkspaces = async () => {

    try {

      const response = await API.get("/");

      setWorkspaces(response.data.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div>

      <h1>Workspace Management</h1>

      <WorkspaceForm
        fetchWorkspaces={fetchWorkspaces}
      />

      <hr />

      <WorkspaceList
        workspaces={workspaces}
        fetchWorkspaces={fetchWorkspaces}
      />

    </div>
  );
};

export default WorkspacePage;