import React, { createContext, useState, useEffect } from "react";
import { checkTokenValidity } from "../api/auth"; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkTokenValidity(token).then(valid => {
        if (valid) {
          setUser({ name : "example", email: "email@exemple.com", role: "role" });
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
