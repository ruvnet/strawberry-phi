import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApiKey } from '../contexts/ApiKeyContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { navItems } from '../nav-items';

const Layout = ({ children }) => {
  const location = useLocation();
  const { apiKey, setApiKey, isApiKeySaved } = useApiKey();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [tempApiKey, setTempApiKey] = React.useState('');

  React.useEffect(() => {
    if (!apiKey && !isApiKeySaved) {
      setIsDialogOpen(true);
    }
  }, [apiKey, isApiKeySaved]);

  const handleSaveApiKey = () => {
    setApiKey(tempApiKey);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex h-screen bg-strawberry-50">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-strawberry-600">Strawberry Phi</h1>
        </div>
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-strawberry-100 text-strawberry-800'
                    : 'text-gray-600 hover:bg-strawberry-50'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OpenAI API Key</DialogTitle>
            <DialogDescription>
              Please enter your OpenAI API key to use the application.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            placeholder="sk-..."
          />
          <DialogFooter>
            <Button onClick={handleSaveApiKey}>Save API Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;