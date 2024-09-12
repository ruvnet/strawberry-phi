import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useApiKey } from '../contexts/ApiKeyContext';

const Settings = () => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { setApiKey } = useApiKey();

  const saveApiKey = async () => {
    setIsSaving(true);
    await setApiKey(apiKeyInput);
    setIsSaving(false);
    setApiKeyInput(''); // Clear the input after saving
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
            <Button onClick={saveApiKey} disabled={isSaving} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
              {isSaving ? 'Saving...' : 'Save API Key'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;