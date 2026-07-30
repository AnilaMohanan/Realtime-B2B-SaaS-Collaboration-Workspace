import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/messages",
});

export const getMessages = (channelId: string) =>
  API.get(`/channel/${channelId}`);

export const sendMessage = (data: any) =>
  API.post("/", data);

export const editMessage = (
  messageId: string,
  data: any
) => API.put(`/${messageId}`, data);

export const deleteMessage = (
  messageId: string
) => API.delete(`/${messageId}`);

export default API;