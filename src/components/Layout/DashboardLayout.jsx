import React, { useState } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Flights', href: '/flights' },
    { name: 'Trips', href: '/trips' },
    { name: 'Analytics', href: '/analytics' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900">
          <span className="text-xl font-semibold text-white">Flight Dashboard</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="px-4 py-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Bars3Icon className="w-6 h-6" />
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;