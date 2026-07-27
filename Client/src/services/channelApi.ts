import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/channels",
});

export const getAllChannels = () => API.get("/");

export const getChannelById = (id: string) =>
  API.get(`/${id}`);

export const createChannel = (data: any) =>
  API.post("/", data);

export const updateChannel = (
  id: string,
  data: any
) => API.put(`/${id}`, data);

export const deleteChannel = (id: string) =>
  API.delete(`/${id}`);

export const getChannelsByWorkspace = (
  workspaceId: string
) => API.get(`/workspace/${workspaceId}`);

export default API;