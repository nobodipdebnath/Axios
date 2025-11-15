// src/App.js
import { useContext, useState } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { users, loading, createUser, updateUser, deleteUser } =
    useContext(AuthContext);

  const [form, setForm] = useState({ title: "", body: "" });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.title === "" || form.body === "") {
      return;
    }
    if (editingId) {
      await updateUser(editingId, form);
      setEditingId(null);
    } else {
      await createUser(form);
    }
    setForm({title: '', body: ''})
  };

  const handleEdit = (user) => {
    setForm({title: user.title, body: user.body});
    setEditingId(user.id)
  }

  const handleCancel = () => {
    setForm({title: '', body: ''});
    setEditingId(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {editingId ? "Edit Post" : "Create New Post"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Body
              </label>
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter body"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div className="grid gap-4 md:grid-cols-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg text-indigo-600 mb-2">
                {user.title}
              </h3>
              <p className="text-gray-700 mb-4">{user.body}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
