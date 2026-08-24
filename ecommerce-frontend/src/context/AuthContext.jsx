import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mock_ecommerce_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('mock_ecommerce_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mock_ecommerce_user');
    }
  }, [user]);

  const login = (email, password) => {
    const matched = mockUsers.find(u => u.email === email && u.password === password);
    if (matched) {
      const authData = { 
        id: matched.id, 
        name: matched.full_name, 
        email: matched.email, 
        role: matched.role, 
        phone: matched.phone 
      };
      setUser(authData);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const register = (userData) => {
    const exists = mockUsers.some(u => u.email === userData.email);
    if (exists) {
      return { success: false, message: "Email already registered" };
    }
    const newUser = { id: Date.now(), ...userData, role: 'customer' };
    mockUsers.push(newUser);
    return { success: true };
  };

  const updateUser = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      updateUser, 
      logout, 
      isAuthenticated: !!user, 
      isAdmin: user?.role === 'admin' 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);