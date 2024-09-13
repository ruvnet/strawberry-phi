import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Plus, ListOrdered, TestTube, Settings, HelpCircle, Menu, Lock, X, Database } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiKey } from '../contexts/ApiKeyContext';
import "@fontsource/mr-dafoe";

const navItems = [
  { title: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, path: '/' },
  { title: 'New Job', icon: <Plus className="h-4 w-4" />, path: '/new-job' },
  { title: 'Job Status', icon: <ListOrdered className="h-4 w-4" />, path: '/jobs' },
  { title: 'Model Testing', icon: <TestTube className="h-4 w-4" />, path: '/test' },
  { title: 'Training Data', icon: <Database className="h-4 w-4" />, path: '/training-data' },
  { title: 'Settings', icon: <Settings className="h-4 w-4" />, path: '/settings' },
  { title: 'Help', icon: <HelpCircle className="h-4 w-4" />, path: '/help' },
];

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { apiKey, isApiKeySaved, setApiKey } = useApiKey();

  useEffect(() => {
    if (!isApiKeySaved && !apiKey) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isApiKeySaved, apiKey]);

  const handleNavigation = (path) => {
    setSidebarOpen(false);
  };

  const handleSaveApiKey = async () => {
    setIsSaving(true);
    await setApiKey(apiKeyInput);
    setIsSaving(false);
    setApiKeyInput('');
    setShowModal(false);
  };

  const handleCloseModal = () => {
    if (isApiKeySaved || apiKey) {
      setShowModal(false);
    }
  };

  const Sidebar = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-lg font-bold text-pink-700">🍓 Strawberry Phi</span>
        </div>
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-pink-700">
          Menu
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start text-pink-600 hover:text-pink-800 hover:bg-pink-100"
              asChild
              onClick={() => handleNavigation(item.path)}
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
            <div className="flex items-center md:hidden">
              <span className="text-sm font-medium text-pink-600">🍓 Strawberry Phi</span>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-pink-50 to-pink-100">
            {children}
          </main>
        </div>
      </div>
      <footer className="bg-white/50 backdrop-blur-sm border-t border-pink-200 py-4 px-6 text-center">
        <p className="text-strawberry-900">
          Fine-tune OpenAI models with ease
        </p>
        <p className="text-strawberry-900 mt-2">
          No Rights Reserved - Go Crazy 🤪, created By <a href="https://github.com/ruvnet/strawberry-phi" target="_blank" rel="noopener noreferrer" className="font-mr-dafoe text-red-800 hover:text-red-600 transition-colors">rUv</a>
        </p>
      </footer>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[300px] md:max-w-[350px] bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg shadow-lg m-0">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-center flex-grow">
                <span className="text-8xl animate-wiggle inline-block mb-6">🍓</span>
                <br />
                <span className="font-mr-dafoe text-4xl text-pink-600">Strawberry Phi</span>
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 rounded-full"
                onClick={handleCloseModal}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-center text-pink-700">
              Fine-tune OpenAI models with ease. Please enter your OpenAI API key to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right text-pink-700">
                API Key
              </Label>
              <Input
                id="apiKey"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="col-span-3 border-pink-300 focus:border-pink-500"
              />
            </div>
          </div>
          <Button onClick={handleSaveApiKey} className="w-full bg-red-500 hover:bg-red-600 text-white">
            {isSaving ? 'Saving...' : 'Save API Key'}
          </Button>
          <div className="mt-4 text-center">
            <Lock className="h-5 w-5 mx-auto text-pink-700 mb-2" />
            <p className="text-sm text-pink-700">
              Your API key is securely encrypted and stored locally in your browser. We never send or store your API key on our servers.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;