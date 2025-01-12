// src/context/AuthContext.jsx
import  { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Use 'AuthProvider' instead of 'AuthContextProvider'
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('authUser');
    setAuthUser(user ? JSON.parse(user) : null);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
