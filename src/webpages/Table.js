import React, { useState } from 'react';

const defaultUsers = [
  { id: 1, name: 'Anjana', role: 'Teacher' },
  { id: 2, name: 'Biswajit', role: 'Engineer' },
];

export default function TablePage() {
  const [newUsers, setNewUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: '' });

  const handleAdd = () => {
    if (!formData.name.trim() || !formData.role.trim()) return;

    const newUser = {
      id: newUsers.length + 1,
      name: formData.name,
      role: formData.role,
    };

    setNewUsers([...newUsers, newUser]);
    setFormData({ name: '', role: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Table</h2>

      <h3 className="text-lg font-semibold mb-2">Default Users</h3>
      <table className="table-auto w-full border-collapse border border-gray-400 dark:border-white mb-6">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {defaultUsers.map(user => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

    <div className=" flex justify-center">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md max-w-md mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 mb-2 rounded border dark:bg-gray-900"
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full p-2 mb-2 rounded border dark:bg-gray-900"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Add to New Table
        </button>
      </div>
</div>
     
      {newUsers.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">New Users</h3>
          <table className="table-auto w-full border-collapse border border-gray-400 dark:border-white">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {newUsers.map(user => (
                <tr key={user.id} className="text-center">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
