import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useApiKeyStore } from '../stores/apiKey';

const ModelSelector = ({ onModelSelect }) => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { getApiKey } = useApiKeyStore();

  useEffect(() => {
    const fetchModels = async () => {
      const apiKey = await getApiKey();
      if (!apiKey) {
        console.error('API key not found');
        return;
      }

      try {
        const response = await fetch('https://api.openai.com/v1/models', {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setModels(data.data);
        setFilteredModels(data.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, [getApiKey]);

  useEffect(() => {
    const filtered = models.filter(model =>
      model.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredModels(filtered);
  }, [searchTerm, models]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search models..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full"
      />
      <Select onValueChange={onModelSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {filteredModels.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;