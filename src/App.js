import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './webpages/Dashboard';
import Calendar from './webpages/Calendar';
import Kanban from './webpages/Kanban';
import Table from './webpages/Table';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar title="Admin Dashboard" />
          <main className="flex-1 overflow-y-auto p-6">
            
          

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/table" element={<Table/>} />

              
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
