import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const UserList = () => {
    const { users, loading, createUser, updateUser, deleteUser } = useContext(AuthContext);

    const handleCreate = async () => {
        const newUser = { title: "নতুন টাইটেল", body: "নতুন বডি", userId: 1 };
        await createUser(newUser);
    };

    const handleUpdate = async (id) => {
        await updateUser(id, { title: "আপডেটেড টাইটেল" });
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
    };

    if (loading) return <p>লোড হচ্ছে...</p>;

    return (
        <div>
            <button onClick={handleCreate}>নতুন পোস্ট যোগ করো</button>
            {users.map(user => (
                <div key={user.id}>
                    <h2>{user.id}</h2>
                    <h3>{user.title}</h3>
                    <button onClick={() => handleUpdate(user.id)}>আপডেট</button>
                    <button onClick={() => handleDelete(user.id)}>ডিলিট</button>
                </div>
            ))}
        </div>
    );
};

export default UserList;