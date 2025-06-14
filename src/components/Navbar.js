import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ title = "Dashboard" }) {
  return (
    <header className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-between shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" title="User">
          
        </div>
      </div>
    </header>
  );
}
