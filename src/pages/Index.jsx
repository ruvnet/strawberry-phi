import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Plus, ListOrdered, TestTube, Settings, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

const navItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'New Job', icon: Plus, path: '/new-job' },
  { title: 'Job Status', icon: ListOrdered, path: '/jobs' },
  { title: 'Model Testing', icon: TestTube, path: '/test' },
  { title: 'Settings', icon: Settings, path: '/settings' },
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
      <aside className={`bg-white w-64 min-h-screen flex flex-col ${drawerOpen ? '' : 'hidden'} md:flex`}>
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">🍓 Strawberry Phi</h1>
        </div>
        <nav className="flex-1">
          {navItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={handleDrawerToggle}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800 ml-2">🍓 Strawberry Phi</h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;