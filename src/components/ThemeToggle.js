import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
  
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDark(html.classList.contains('dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded transition"
    >
      {isDark ? '🌙 Dark' : '🌞 Light'}
    </button>
  );
}
