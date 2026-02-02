import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Pydantic schemas in backend expect UserLogin {email, password}
      // Note: Backend AUTH /login currently uses schemas.UserLogin
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password
      });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      await fetchUser(token);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      await axios.post('http://localhost:8000/auth/register', {
        email,
        password
      });
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8000/auth/me', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      return true;
    } catch (error) {
      console.error('Update failed', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
