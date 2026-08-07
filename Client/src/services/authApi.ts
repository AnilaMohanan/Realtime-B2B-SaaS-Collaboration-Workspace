import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const registerUser = (data: any) =>
  API.post("/register", data);

export const loginUser = (data: any) =>
  API.post("/login", data);
console.log(localStorage.getItem("token"));
export const logoutUser = () => {
  const token = localStorage.getItem("token");

  return API.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default API;