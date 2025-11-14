// src/context/AuthProvider.js
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

    useEffect(() => {
        const fetchUsers = async() => {
            try {
                setLoading(true);
                const res = await axios.get(API_URL);
                setUsers(res.data);
                setError(null)
            } catch (error) {
                setError(error);
                return{success: false, error: error.message};
            } finally{
                setLoading(false);
            }
        }
        fetchUsers();
    },[])

    const createUser = async(newUser) => {
        try {
            setLoading(true);
            const res = await axios.post(API_URL, newUser);
            setUsers((prev) => [res.data,...prev]);
        } catch (error) {
            setError(error.message);
        } finally{
            setLoading(false);
        }
    }

    const updateUser = async(id, updatedUser) => {
        try {
            setLoading(true);
            const res = await axios.put(`${API_URL}/${id}`, updatedUser);
            setUsers((prev) => prev.map(user => (user.id === id)? {...user, ...res} : user))
        } catch (error) {
            setError(error.message);
        } finally{
            setLoading(false);
        }
    }

    const deleteUser = async(id) => {
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${id}`);
            setUsers(prev => prev.filter(user => user.id !== id));
            setError(null);
        } catch (error) {
            setError(error.message);           
        } finally{
            setLoading(false);
        }
    }

  const userInfo = {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
