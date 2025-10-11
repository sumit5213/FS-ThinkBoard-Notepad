import axios from "axios"

//productin
const BASE_URL = import.meta.env.MODE ==="development"? "http://localhost:5000/api": "/api"

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
