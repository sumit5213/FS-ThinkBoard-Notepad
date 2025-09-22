import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../lib/axios"; // We will create/update this file next

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        // This effect syncs the state with localStorage when the component mounts
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            // Set the token for all future axios requests
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        // Set the token for all future axios requests
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        navigate("/home");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        // Remove the authorization header
        delete axiosInstance.defaults.headers.common["Authorization"];
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};