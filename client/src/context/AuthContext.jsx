import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        if (res.data?.success && res.data?.data?.user) {
          setUser(res.data.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data?.success && res.data?.data?.user) {
        setUser(res.data.data.user);
        if (res.data?.data?.token) {
          localStorage.setItem("token", res.data.data.token);
        }
        return { success: true };
      }
      return { success: false, message: res.data?.message || "Login failed" };
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials or network error";
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      if (res.data?.success && res.data?.data?.user) {
        setUser(res.data.data.user);
        if (res.data?.data?.token) {
          localStorage.setItem("token", res.data.data.token);
        }
        return { success: true };
      }
      return { success: false, message: res.data?.message || "Registration failed" };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
