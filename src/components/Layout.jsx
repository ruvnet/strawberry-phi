import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Plus, ListOrdered, TestTube, Settings, HelpCircle, Menu } from "lucide-react";
import "@fontsource/mr-dafoe";

const navItems = [
  { title: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, path: '/' },
  { title: 'New Job', icon: <Plus className="h-4 w-4" />, path: '/new-job' },
  { title: 'Job Status', icon: <ListOrdered className="h-4 w-4" />, path: '/jobs' },
  { title: 'Model Testing', icon: <TestTube className="h-4 w-4" />, path: '/test' },
  { title: 'Settings', icon: <Settings className="h-4 w-4" />, path: '/settings' },
  { title: 'Help', icon: <HelpCircle className="h-4 w-4" />, path: '/help' },
];

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Sidebar = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-pink-700">
          🍓 Strawberry Phi
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start text-pink-600 hover:text-pink-800 hover:bg-pink-100"
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
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100">
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-64 overflow-y-auto border-r border-pink-200 bg-white/50 backdrop-blur-sm md:block">
          <Sidebar />
        </aside>
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b border-pink-200 bg-white/50 backdrop-blur-sm px-4 md:px-6">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-pink-600">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-gradient-to-br from-pink-100 to-pink-200">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-lg font-bold text-pink-700">🍓 Strawberry Phi</span>
              </Link>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-pink-600">Fine-tune OpenAI models with ease</span>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-pink-50 to-pink-100">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-pink-800">Fine-tune OpenAI models with ease</h2>
              <p className="text-sm text-pink-600 mt-1">Empowering AI, one strawberry at a time.</p>
            </div>
            {children}
          </main>
        </div>
      </div>
      <footer className="bg-white/50 backdrop-blur-sm border-t border-pink-200 py-4 px-6 text-center">
        <p className="text-strawberry-900">
          No Rights Reserved - Go Crazy 🤪, created By <span className="font-mr-dafoe text-2xl">rUv</span>
        </p>
        <a href="https://github.com/ruvnet/strawberry-phi" target="_blank" rel="noopener noreferrer" className="text-strawberry-700 hover:text-strawberry-900 transition-colors">
          GitHub Repository
        </a>
      </footer>
    </div>
  );
};

export default Layout;