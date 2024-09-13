import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApiKey } from '../contexts/ApiKeyContext';
import axios from 'axios';

const ModelSelector = ({ onModelSelect, defaultModel }) => {
  const [models, setModels] = useState([]);
  const { apiKey } = useApiKey();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('https://api.openai.com/v1/models', {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });
        const allModels = response.data.data;
        const relevantModels = allModels.filter(model => 
          model.id.startsWith('gpt-') || model.id.includes('ft-') || model.id.startsWith('ft:')
        );
        setModels(relevantModels);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    if (apiKey) {
      fetchModels();
    }
  }, [apiKey]);

  const formatModelName = (modelId) => {
    if (modelId.startsWith('ft:')) {
      const parts = modelId.split(':');
      return `${parts[1]} (Custom: ${parts[3] || 'Latest'})`;
    }
    return modelId;
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={onModelSelect} defaultValue={defaultModel}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {formatModelName(model.id)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;