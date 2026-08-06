import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const registerUser = (data: any) =>
  API.post("/register", data);

export const loginUser = (data: any) =>
  API.post("/login", data);

export const logoutUser = (refreshToken: string) =>
  API.post("/logout", { refreshToken });

export default API;