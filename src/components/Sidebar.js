import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { path: '/', label: 'Dashboard' },
  { path: '/calendar', label: 'Calendar' },
  { path: '/kanban', label: 'Kanban Board' },
  { path: '/table', label: 'Table' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-gray-100 dark:bg-gray-800 p-4 hidden md:block">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {links.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`px-4 py-2 rounded transition-all 
              ${location.pathname === path
                ? 'bg-green-500 text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}
            `}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
