import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("userInfos") || "{}");

    const [user, setUser] = useState(storedUser);
    const [isAuthen, setIsAuthen] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState(storedUser.firstName || "");
    const [lastName, setLastName] = useState(storedUser.lastName || "");
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthen(false);
                setLoading(false);
                return;
            }
            try {
                const response = await axios.post(
                    "https://api.mrh-store.com/api/authorize/ping",
                    { token },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data.ok) {
                    setIsAuthen(true);
                    const userInfos = JSON.parse(localStorage.getItem("userInfos") || "{}");
                    setUser(userInfos);
                    setFirstName(userInfos.firstName || "");
                    setLastName(userInfos.lastName || "");
                } else {
                    handleLogout();
                }
            } catch (err) {
                console.error("Error during authentication ping:", err);
                setIsAuthen(false);
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthen(false);
        navigate("/");
    };

    const value = {
        isAuthen,
        setIsAuthen,
        loading,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        error,
        handleLogout,
        user,
        setUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
