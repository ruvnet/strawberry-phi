import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { EyeIcon, EyeOffIcon, TrashIcon } from "lucide-react";
import { useApiKey } from '../contexts/ApiKeyContext';
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { apiKey, setApiKey, removeApiKey } = useApiKey();
  const { toast } = useToast();

  useEffect(() => {
    if (apiKey) {
      setApiKeyInput('********');
    }
    // Load other settings from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedNotifications = localStorage.getItem('notificationsEnabled') !== 'false';
    setDarkMode(savedDarkMode);
    setNotificationsEnabled(savedNotifications);
  }, [apiKey]);

  const saveApiKey = async () => {
    setIsSaving(true);
    await setApiKey(apiKeyInput);
    setIsSaving(false);
    setApiKeyInput('********');
    toast({
      title: "API Key Saved",
      description: "Your API key has been securely saved.",
    });
  };

  const handleRemoveApiKey = () => {
    removeApiKey();
    setApiKeyInput('');
    toast({
      title: "API Key Removed",
      description: "Your API key has been removed.",
    });
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const toggleNotifications = () => {
    const newNotificationsEnabled = !notificationsEnabled;
    setNotificationsEnabled(newNotificationsEnabled);
    localStorage.setItem('notificationsEnabled', newNotificationsEnabled);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-strawberry-800">Settings</h1>
      <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
        <CardHeader>
          <CardTitle className="text-strawberry-700">API Key Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-strawberry-600">OpenAI API Key</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="border-strawberry-300 focus:border-strawberry-500 pr-10"
                  placeholder={apiKey ? "API Key is set" : "Enter your OpenAI API Key"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-strawberry-500"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={saveApiKey} disabled={isSaving} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
                {isSaving ? 'Saving...' : 'Save API Key'}
              </Button>
              <Button onClick={handleRemoveApiKey} variant="outline" className="border-strawberry-300 text-strawberry-600">
                <TrashIcon className="h-4 w-4 mr-2" />
                Remove API Key
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm border-strawberry-200">
        <CardHeader>
          <CardTitle className="text-strawberry-700">Application Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode" className="text-strawberry-600">Dark Mode</Label>
              <Switch
                id="darkMode"
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-strawberry-600">Enable Notifications</Label>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={toggleNotifications}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;