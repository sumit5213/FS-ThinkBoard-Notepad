import axios from "axios"

//productin

// const PRODUCTION_URL = "https://your-backend-api-url.onrender.com"; 

// const BASE_URL = import.meta.env.MODE ==="development"? "http://localhost:5000/api":`${PRODUCTION_URL}/api`

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
});

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
