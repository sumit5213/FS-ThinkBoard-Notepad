import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../lib/axios"; // We will create/update this file next

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        navigate("/home");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        delete axiosInstance.defaults.headers.common["Authorization"];
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook 
export const useAuth = () => {
    return useContext(AuthContext);
};