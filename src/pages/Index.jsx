import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Plus,
  ListOrdered,
  TestTube,
  Settings,
  Menu
} from "lucide-react";

const navItems = [
  { title: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, path: '/' },
  { title: 'New Job', icon: <Plus className="h-4 w-4" />, path: '/new-job' },
  { title: 'Job Status', icon: <ListOrdered className="h-4 w-4" />, path: '/jobs' },
  { title: 'Model Testing', icon: <TestTube className="h-4 w-4" />, path: '/test' },
  { title: 'Settings', icon: <Settings className="h-4 w-4" />, path: '/settings' },
];

const Index = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold">🍓 Strawberry Phi</span>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={handleDrawerToggle}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex-grow">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-grow overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={handleDrawerToggle}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Strawberry Phi</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Index;