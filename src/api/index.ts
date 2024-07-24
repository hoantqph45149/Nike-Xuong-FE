import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    // console.log(`bearer ${token}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
