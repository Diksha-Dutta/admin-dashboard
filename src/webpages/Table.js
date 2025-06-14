import React, { useState, useRef } from 'react';

const defaultUsers = [
  { id: 1, name: 'Anjana', role: 'Teacher' },
  { id: 2, name: 'Biswajit', role: 'Engineer' },
];

export default function TablePage() {
  const [newUsers, setNewUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', role: '' });
  const nameRef = useRef(null);

  const handleAdd = () => {
    const name = formData.name.trim();
    const role = formData.role.trim();
    if (!name || !role) return;

    const newUser = {
      id: Date.now(),
      name,
      role,
    };

    setNewUsers(prev => [...prev, newUser]);
    setFormData({ name: '', role: '' });
    nameRef.current?.focus();
  };

  const handleDelete = (id) => {
    setNewUsers(prev => prev.filter(user => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditData({ name: user.name, role: user.role });
  };

  const saveEdit = (id) => {
    const name = editData.name.trim();
    const role = editData.role.trim();
    if (!name || !role) return;

    setNewUsers(prev =>
      prev.map(user => (user.id === id ? { ...user, name, role } : user))
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: '', role: '' });
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">👥 Employee Directory</h2>

     
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">🏢 Default Employees</h3>
        <table className="table-auto w-full border-collapse border border-gray-400 dark:border-white shadow-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {defaultUsers.map(user => (
              <tr key={user.id} className="text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

 
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">➕ Add New Employee</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg w-full md:w-96 mx-auto">
          <input
            type="text"
            placeholder="Name"
            ref={nameRef}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onKeyDown={handleKey}
            className="w-full mb-3 px-3 py-2 rounded border dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            onKeyDown={handleKey}
            className="w-full mb-3 px-3 py-2 rounded border dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
        </div>
      </div>

  
      <h3 className="text-xl font-semibold mb-3">🧾 New Employees</h3>
      {newUsers.length === 0 ? (
        <p className="text-gray-500 italic text-center">No new employees added yet 💤</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-400 dark:border-white shadow-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newUsers.map(user => (
              <tr key={user.id} className="text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="px-2 py-1 rounded w-full"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border p-2">
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={editData.role}
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                      className="px-2 py-1 rounded w-full"
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  {editingId === user.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(user.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
