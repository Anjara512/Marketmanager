import axios from "axios";
const token = localStorage.getItem("token");

export const API = axios.create({
  baseURL: "http://localhost:7000",
  headers: { Authorization: `Bearer ${token}` },
});
