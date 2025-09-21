import axios from "axios"

// //productin
// const BASE_URL = import.meta.env.MODE ==="development"? "http://localhost:5001/api": "/api"

// const api = axios.create({
//     baseURL: BASE_URL,
// })

// export default api;


// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend base URL
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
