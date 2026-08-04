import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000/api/documents",
});

export const createDocument = (data: any)  => API.post("/", data);

export const getAllDocuments = () =>
  API.get("/");

export const getDocumentById = (
  id: string
) => API.get(`/${id}`);

export const getDocumentsByWorkspace = (
  workspaceId: string
) => API.get(`/workspace/${workspaceId}`);

export const updateDocument = (
  id: string,
  data: Document
)=> API.put(`/${id}`, data);

export const deleteDocument = (
  id: string
) => API.delete(`/${id}`);

export const searchDocuments = (
  keyword: string
) =>
  API.get(
    `/search?keyword=${keyword}`
  );

export const getRecentDocuments =
  () => API.get("/recent");