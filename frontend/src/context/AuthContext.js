import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/users/me");
      setUser(data);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
