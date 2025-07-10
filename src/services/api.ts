import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": import.meta.env.VITE_API_KEY ?? "",
  },
});


export default api;
