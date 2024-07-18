import React, { createContext, useState, useEffect } from "react";
import jsCookie from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(!!jsCookie.get("token"));

  useEffect(() => {
    const handleTokenChange = () => {
      setIsAuthenticated(!!jsCookie.get("token"));
    }

    window.addEventListener("storage", handleTokenChange);

    return () => {
      window.removeEventListener("storage", handleTokenChange);
    }

  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )

}