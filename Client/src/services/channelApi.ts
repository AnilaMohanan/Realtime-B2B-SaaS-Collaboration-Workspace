import axios from "axios";

const API = "http://localhost:5000/api/channels";

// Create Channel
export const createChannel = async (data: any) => {
  const response = await axios.post(API, data);
  return response.data;
};

// Get All Channels
export const getAllChannels = async () => {
  const response = await axios.get(API);
  return response.data;
};

// Get Channel By Id
export const getChannelById = async (id: string) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};

// Update Channel
export const updateChannel = async (
  id: string,
  data: any
) => {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
};

// Delete Channel
export const deleteChannel = async (id: string) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};