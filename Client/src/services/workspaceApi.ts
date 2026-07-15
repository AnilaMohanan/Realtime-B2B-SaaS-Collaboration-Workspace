import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/workspaces",
});

export default API;