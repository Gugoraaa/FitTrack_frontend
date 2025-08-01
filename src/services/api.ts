import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": import.meta.env.VITE_API_KEY ?? "",

  },
  withCredentials:true

});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login'; 
      console.log(error)
    }
    return Promise.reject(error);
  }
);


export default api;
