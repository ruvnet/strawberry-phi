import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Plus, ListOrdered, TestTube, Settings, Menu } from "lucide-react";

const navItems = [
  { title: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, path: '/' },
  { title: 'New Job', icon: <Plus className="h-4 w-4" />, path: '/new-job' },
  { title: 'Job Status', icon: <ListOrdered className="h-4 w-4" />, path: '/jobs' },
  { title: 'Model Testing', icon: <TestTube className="h-4 w-4" />, path: '/test' },
  { title: 'Settings', icon: <Settings className="h-4 w-4" />, path: '/settings' },
];

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Sidebar = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          🍓 Strawberry Phi
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link to={item.path}>
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden w-64 overflow-y-auto border-r bg-gray-100/40 md:block">
        <Sidebar />
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-lg font-bold">🍓 Strawberry Phi</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;