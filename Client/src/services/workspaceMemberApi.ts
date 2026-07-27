import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/workspace-members",
});

export const getWorkspaceMembers = (workspaceId: string) =>
  API.get(`/workspace/${workspaceId}`);

export const addWorkspaceMember = (data: any) =>
  API.post("/", data);

export const updateWorkspaceMember = (id: string, data: any) =>
  API.put(`/${id}`, data);

export const deleteWorkspaceMember = (id: string) =>
  API.delete(`/${id}`);

export default API;