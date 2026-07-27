import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/workspaces",
});
export const getAllWorkspaces = () => API.get("/");

export const createWorkspace = (data: any) => API.post("/", data);
export const updateWorkspace = (id: string, data: any) =>
  API.put(`/${id}`, data);
export const deleteWorkspace = (id: string) => API.delete(`/${id}`);
export const getWorkspaceById = (id: string) =>
  API.get(`/${id}`);

export default API;