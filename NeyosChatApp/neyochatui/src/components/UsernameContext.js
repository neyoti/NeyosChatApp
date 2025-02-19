import React, { createContext, useState, useContext } from "react";

// Create context
const UserNameContext = createContext();

// Custom hook for easy access
export const useUser = () => useContext(UserNameContext);

export const UserNameProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <UserNameContext.Provider value={{ username, setUsername, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserNameContext.Provider>
  );
};
